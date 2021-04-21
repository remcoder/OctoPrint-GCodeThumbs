# Octoprint Gcode Thumbs

_NOTICE: I'm not actively developing this plugin anymore. You're welcome to send in a PR and I promise to review it and I'll attempt to merge it. Other than that I will not be developing on it anymore_

Enriches the file list with a preview thumbnail for each gcode file.

![image](https://user-images.githubusercontent.com/461650/58376079-2ec9a400-7f62-11e9-85e0-f48329dabb2c.png)

## Use at your own risk
This plugin uses some hacks to do what is otherwise impossible via the official API. This means that upgrading Octoprint or using other plugins could lead to issues.

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/remcoder/OctoPrint-GCodeThumbs/archive/master.zip

## Changelog
0.2.2
  * Update GCode Preview to v2.0.6. This fixes an issue with the model sometime not being visible or centered correctly

0.2.1
  * properly handle files in subfolders

0.2.0
  * fixed detection of which gcode files are scrolled into view
  * added caching to avoid re-downloading gcode files
  * use internal filename if it differs from the original name
  * improved error handling

0.1.0
  * initial version
