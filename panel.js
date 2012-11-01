  function Console() {}

  Console.Type = {
      LOG: "log",
      DEBUG: "debug",
      INFO: "info",
      WARN: "warn",
      ERROR: "error",
      GROUP: "group",
      GROUP_COLLAPSED: "groupCollapsed",
      GROUP_END: "groupEnd"
  };

  Console.addMessage = function(type, format, args) {
      chrome.extension.sendMessage({
          from: chrome.devtools.inspectedWindow.tabId,
          args: escape(JSON.stringify(Array.prototype.slice.call(arguments, 0)))
      });
  };

  // Generate Console output methods, i.e. Console.log(), Console.debug() etc.
   (function() {
      var console_types = Object.getOwnPropertyNames(Console.Type);
      for (var type = 0; type < console_types.length; ++type) {
          var method_name = Console.Type[console_types[type]];
          Console[method_name] = Console.addMessage.bind(Console, method_name);
      }
  })();

  $(document).ready(function() {
      chrome.devtools.network.onRequestFinished.addListener(function(request) {
          //Console.debug(request);
          var name = request.request.url.match(/[^/]+$/)[0];
          var method = request.request.method;
          var contentType = request.response.content.mimeType;
          Console.debug(name + ":" + method + ":" + contentType);
          var row = $(".data-container tr.filler").clone();
          row.removeClass("filler");
          row.addClass("revealed");
          //Console.debug(row);
      });
  });
