module.exports = {
  export: require('./exporter'),
  defaults:    require('./formats/defaults'),
  gnome:       require('./formats/gnome'),
  guake:       require('./formats/guake'),
  iterm:       require('./formats/iterm'),
  konsole:     require('./formats/konsole'),
  mintty:      require('./formats/mintty'),
  putty :      require('./formats/putty'),
  termite:     require('./formats/termite'),
  terminator:  require('./formats/terminator'),
  xfce:        require('./formats/xfce'),
  xresources:  require('./formats/xresources'),
};
