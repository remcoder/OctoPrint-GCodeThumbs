# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class GCodeThumbsPlugin(octoprint.plugin.StartupPlugin,
                          octoprint.plugin.AssetPlugin):

    def on_after_startup(self):
      self._logger.info("Hello World from GCodeThumbsPlugin!")

    def get_assets(self):
        return dict(
            js=["js/gcode-preview.js", "js/gcode-preview-viewmodel.js"]
        )

__plugin_implementation__ = GCodeThumbsPlugin()
