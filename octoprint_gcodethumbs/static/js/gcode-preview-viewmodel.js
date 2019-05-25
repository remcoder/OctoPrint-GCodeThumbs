$(function() {
  function GCodePreviewViewModel(parameters) {
    console.log("initializing GCodePreviewViewModel");

    var self = this;
    var downloading = false;

    self.filesViewModel = parameters[0];
    console.log(self.filesViewModel);
    const previews = {}; // maps filenames to GCodePreview instances

    /*
      HACK! unfortunately there seems to be no way to enrich the files section in a clean way
      (barring completely replacing the whole UI). Please tell me if I'm wrong :-)
      So we just monitor the dom and patch it whenever we think it is necessary.
      To keep things in proportion we will cache the dom fragments in memory and we'll
      limit our updates to the currently visible area in the scrollable list.
    */
    const scrollContainer = document.querySelector('.gcode_files .scroll-wrapper');
    var timer = null;

    // TODO: reset timer onscroll
    function monitorDom() {
      if (downloading) return;

      const elements = getElements()
        .filter( isVisible )
        .filter( elementNeedsPreview );

      console.log('[monitor] ', elements.length, ' elements queued');

      if (elements.length)
        enrichWithPreview(elements[0]);

      timer = setTimeout(monitorDom, 100);
    }

    function getElements() {
      return [].slice.call(document.querySelectorAll('.entry.machinecode'));
    }

    function isVisible(el) {
      return el.offsetTop + el.offsetHeight > scrollContainer.scrollTop &&
             el.offsetTop < scrollContainer.scrollTop + scrollContainer.offsetHeight;
    }

    // check if the element has been enriched with a preview already
    function elementNeedsPreview(element) {
      return !element.querySelector('canvas');
    }

    // TODO: include device and parent folder(s) to ensure uniqueness
    function extractKey(element) {
      return element.querySelector('.title').innerText;
    }

    // renders a preview unattached to the dom
    // TODO: cache
    function renderPreview(element, gcode) {
        // create canvas
        const canvas = document.createElement('canvas');

        // instantiate preview
        const preview = new GCodePreview({
          canvas : canvas,
        });

        // resize to container
        canvas.width = element.offsetWidth;

        // render while still detached from the DOM
        preview.processGCode(gcode);

        return canvas;
    }

    function enrichWithPreview(element) {
      const filename = extractKey(element);
      downloading = true;

      // TODO: show spinner while downloading
      OctoPrint.files.download("local", filename)
        .done(function(response, rstatus) {
          downloading = false;
          if(rstatus === 'success') {

            const canvas = renderPreview(element, response);

            // attach to DOM
            insertAfter(canvas, element.querySelector('.title'))
          }
        })
        .catch(function() {
          downloading = false;
        });
    }

    function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextElementSibling);
    }

    setTimeout(monitorDom, 2000);
  }

  OCTOPRINT_VIEWMODELS.push([GCodePreviewViewModel, ["filesViewModel"], "#element"]);
})
