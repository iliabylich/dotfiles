local wezterm = require 'wezterm'
local config = wezterm.config_builder()
local act = wezterm.action

config.color_scheme = 'Afterglow'
config.keys = {}

for i = 1, 8 do
table.insert(config.keys, {
    key = tostring(i),
    mods = 'ALT',
    action = act.ActivateTab(i - 1),
})
end

config.enable_scroll_bar = true
config.min_scroll_bar_height = "3cell"

return config
