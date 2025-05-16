local wezterm = require 'wezterm'
local config = wezterm.config_builder()
local act = wezterm.action

config.color_scheme = 'Andromeda'

local padding = "30px"
config.window_padding = {
    left = padding,
    right = padding,
    top = padding,
    bottom = padding,
}

config.keys = {
    {
        key = 'k',
        mods = 'CMD',
        action = act.Multiple {
            act.ClearScrollback 'ScrollbackAndViewport',
            act.SendKey { key = 'L', mods = 'CTRL' },
        },
    },
}

for i = 1, 8 do
    table.insert(config.keys, {
        key = tostring(i),
        mods = 'ALT',
        action = act.ActivateTab(i - 1),
    })
end

config.enable_scroll_bar = true
config.min_scroll_bar_height = "3cell"
config.scrollback_lines = 10000

-- open links with ctrl+click
config.mouse_bindings = {
    {
      event = { Up = { streak = 1, button = "Left"} },
      mods = "NONE",
      action = wezterm.action.DisableDefaultAssignment,
    },
    {
        event = { Up = { streak = 1, button = "Left" } },
        mods = "CTRL",
        action = wezterm.action.OpenLinkAtMouseCursor,
    },
    {
        event = { Down = { streak = 1, button = "Left" } },
        mods = "CTRL",
        action = wezterm.action.Nop,
    },
}

return config
