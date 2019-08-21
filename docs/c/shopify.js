    /*<![CDATA[*/

    (function () {
      var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        } else {
          loadScript();
        }
      } else {
        loadScript();
      }

      function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
      }

      function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
          domain: 'cacao-tea.myshopify.com',
          storefrontAccessToken: 'bfb01e1540066184515323a79387c3a7',
        });

        ShopifyBuy.UI.onReady(client).then(function (ui) {
          ui.createComponent('product', {
            id: [2076234809432],
            node: document.getElementById('product-component-6c28bbf2ab9'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
  "product": {
    "buttonDestination": "checkout",
    "variantId": "all",
    "width": "240px",
    "contents": {
      "img": false,
      "imgWithCarousel": false,
      "title": false,
      "variantTitle": false,
      "price": false,
      "description": false,
      "buttonWithQuantity": false,
      "quantity": false
    },
    "text": {
      "button": "BUY CACAO TEA"
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "button": {
        "background-color": "#000000",
        ":hover": {
          "background-color": "#000000"
        },
        "border-radius": "15px",
        ":focus": {
          "background-color": "#000000"
        },
        "font-weight": "bold"
      }
    }
  },
  "cart": {
    "contents": {
      "button": true
    },
    "styles": {
      "button": {
        "background-color": "#000000",
        ":hover": {
          "background-color": "#000000"
        },
        "border-radius": "15px",
        ":focus": {
          "background-color": "#000000"
        },
        "font-weight": "bold"
      },
      "footer": {
        "background-color": "#ffffff"
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "variantTitle": false,
      "buttonWithQuantity": true,
      "button": false,
      "quantity": false
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "background-color": "#000000",
        ":hover": {
          "background-color": "#000000"
        },
        "border-radius": "15px",
        ":focus": {
          "background-color": "#000000"
        },
        "font-weight": "bold"
      }
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "background-color": "#000000",
        ":hover": {
          "background-color": "#000000"
        },
        ":focus": {
          "background-color": "#000000"
        },
        "font-weight": "bold"
      }
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  }
}
          });
        });
      }
    })();
    /*]]>*/