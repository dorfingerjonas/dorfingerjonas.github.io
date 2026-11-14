/*
 * Page behaviour, no libraries:
 * accent cycling, theme toggle, scroll reveals, parallax background,
 * avatar eye tracking, the lap timer, card tilt and draggable stickers.
 * Every feature is opt-in through a data attribute in the markup.
 */
(() => {
    const root = document.documentElement;
    const store = window.portfolio;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const all = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    /* ---------- Accent colour ---------- */
    const syncAccent = () => {
        const colour = store.palette[store.index];
        all('[data-accent-name]').forEach(el => el.textContent = colour.name);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colour.hex);
    };

    all('[data-accent-cycle]').forEach(button => button.addEventListener('click', () => {
        store.set((store.index + 1) % store.palette.length);
        syncAccent();
    }));
    syncAccent();

    /* ---------- Theme toggle (circular reveal where supported) ---------- */
    const currentTheme = () => root.dataset.theme
        || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    all('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        const apply = () => {
            root.dataset.theme = next;
            try { localStorage.setItem('theme', next); } catch (e) { /* not persisted */ }
        };

        if (!document.startViewTransition || reduceMotion) return apply();

        const box = button.getBoundingClientRect();
        const x = box.left + box.width / 2;
        const y = box.top + box.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        root.classList.add('theme-switch');
        const transition = document.startViewTransition(apply);
        transition.ready.then(() => root.animate(
            {clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]},
            {duration: 550, easing: 'cubic-bezier(.2,.7,.1,1)', pseudoElement: '::view-transition-new(root)'}
        )).catch(() => {});
        transition.finished.finally(() => root.classList.remove('theme-switch'));
    }));

    /* ---------- Headline split: one masked span per word ---------- */
    all('[data-split]').forEach(heading => {
        const text = heading.textContent.trim().replace(/\s+/g, ' ');
        heading.setAttribute('aria-label', text);
        heading.textContent = '';
        text.split(' ').forEach((word, i) => {
            const mask = document.createElement('span');
            const inner = document.createElement('span');
            mask.className = 'word';
            mask.setAttribute('aria-hidden', 'true');
            inner.textContent = word;
            inner.style.setProperty('--i', i);
            mask.append(inner);
            heading.append(mask, ' ');
        });
    });

    /* ---------- Scroll reveals ---------- */
    // Children of a [data-stagger] container animate one after another.
    all('[data-stagger]').forEach(group =>
        all('[data-reveal]', group).forEach((el, i) => el.style.setProperty('--i', i)));

    const targets = all('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
        }), {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
        targets.forEach(el => observer.observe(el));
    } else {
        targets.forEach(el => el.classList.add('in'));
    }

    /* ---------- Parallax background ----------
     * Writes three numbers onto the container; CSS multiplies them
     * with each shape's own --depth. Pointer on desktop, scroll everywhere. */
    if (!reduceMotion) all('[data-parallax]').forEach(scene => {
        let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0, visible = true;

        const tick = () => {
            x += (targetX - x) * 0.07;
            y += (targetY - y) * 0.07;
            scene.style.setProperty('--px', x.toFixed(4));
            scene.style.setProperty('--py', y.toFixed(4));
            scene.style.setProperty('--sy', Math.max(0, -scene.getBoundingClientRect().top).toFixed(1));
            const moving = Math.abs(targetX - x) > 0.0005 || Math.abs(targetY - y) > 0.0005;
            frame = moving ? requestAnimationFrame(tick) : 0;
        };
        const wake = () => { if (!frame && visible) frame = requestAnimationFrame(tick); };

        if (finePointer) addEventListener('pointermove', event => {
            targetX = event.clientX / innerWidth * 2 - 1;
            targetY = event.clientY / innerHeight * 2 - 1;
            wake();
        }, {passive: true});
        addEventListener('scroll', wake, {passive: true});

        if ('IntersectionObserver' in window) {
            // Re-sync on re-entry: a jump back to the top can outrun the scroll listener.
            new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting;
                wake();
            }).observe(scene);
        }
    });

    /* ---------- Avatar eyes follow the pointer ---------- */
    if (!reduceMotion && finePointer) all('[data-eyes]').forEach(avatar => {
        const eyes = all('.eye', avatar);
        addEventListener('pointermove', event => {
            const box = avatar.getBoundingClientRect();
            const dx = event.clientX - (box.left + box.width * 0.48);
            const dy = event.clientY - (box.top + box.height * 0.46);
            const distance = Math.hypot(dx, dy) || 1;
            const reach = Math.min(1, distance / 240);
            const offset = `translate(${(dx / distance * 2.4 * reach).toFixed(2)}px, ${(dy / distance * 1.8 * reach).toFixed(2)}px)`;
            eyes.forEach(eye => eye.style.transform = offset);
        }, {passive: true});
    });

    /* ---------- Lap timer: time spent on the page ---------- */
    const laps = all('[data-lap]');
    if (laps.length) {
        const start = performance.now();
        const pad = n => String(n).padStart(2, '0');
        const draw = () => {
            const tenths = Math.floor((performance.now() - start) / 100);
            const value = `${pad(Math.floor(tenths / 600))}:${pad(Math.floor(tenths / 10) % 60)}.${tenths % 10}`;
            laps.forEach(el => el.textContent = value);
        };
        draw();
        setInterval(draw, reduceMotion ? 1000 : 100);
    }

    /* ---------- Card tilt ---------- */
    if (!reduceMotion && finePointer) all('[data-tilt]').forEach(card => {
        card.addEventListener('pointermove', event => {
            const box = card.getBoundingClientRect();
            card.style.setProperty('--ry', ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
            card.style.setProperty('--rx', (0.5 - (event.clientY - box.top) / box.height).toFixed(3));
        });
        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--rx', 0);
            card.style.setProperty('--ry', 0);
        });
    });

    /* ---------- Draggable stickers (mouse and trackpad only) ---------- */
    if (finePointer) all('[data-drag]').forEach(item => {
        let dragging = false, startX = 0, startY = 0, x = 0, y = 0, originX = 0, originY = 0;
        let minX = 0, maxX = 0, minY = 0, maxY = 0;
        const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

        item.addEventListener('pointerdown', event => {
            if (event.button !== 0) return;
            // Limits are measured before the lift-off scale, so a sticker cannot leave its board.
            const area = item.closest('[data-drag-area]')?.getBoundingClientRect();
            const box = item.getBoundingClientRect();
            if (area) {
                minX = x + area.left - box.left;
                maxX = x + area.right - box.right;
                minY = y + area.top - box.top;
                maxY = y + area.bottom - box.bottom;
            } else {
                minX = minY = -Infinity;
                maxX = maxY = Infinity;
            }
            dragging = true;
            startX = event.clientX;
            startY = event.clientY;
            originX = x;
            originY = y;
            item.setPointerCapture(event.pointerId);
            item.classList.add('dragging');
        });

        item.addEventListener('pointermove', event => {
            if (!dragging) return;
            x = clamp(originX + event.clientX - startX, minX, maxX);
            y = clamp(originY + event.clientY - startY, minY, maxY);
            item.style.setProperty('--dx', `${x}px`);
            item.style.setProperty('--dy', `${y}px`);
        });

        const drop = () => {
            dragging = false;
            item.classList.remove('dragging');
        };
        item.addEventListener('pointerup', drop);
        item.addEventListener('pointercancel', drop);
    });
})();
