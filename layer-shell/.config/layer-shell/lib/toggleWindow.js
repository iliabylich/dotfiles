const windows = {};

export function registerWindow(name, { window, reset }) {
    windows[name] = { window, reset };
}

export function toggleWindow(name) {
    if (!windows[name]) {
        const message = `There is no window ${name}`;
        console.error(message);
        throw new Error(message);
    }
    const { window, reset } = windows[name];
    if (!window.get_visible()) {
        reset();
    }
    window.set_visible(!window.get_visible());
}
