# Octoprint Gcode Thumbs

Enriches the file list with a preview thumbnail for each gcode file.

## Use at your own risk
This plugin uses some hack to what is otherwise impossible via the official API. This means that upgrading Octoprint or using other plugins will lead to all sorts of issues.

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/remcoder/OctoPrint-GCodeThumbs/archive/master.zip

## Changelog

0.2.0
  * fixed detection of which gcode files are scrolled into view
  * added caching to avoid re-downloading gcode files
  * use internal filename if it differs from the original name
  * improved error handling

0.1.0
  * initial version
