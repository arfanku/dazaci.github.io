(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

// function buyNow(namaProduk, hargaProduk) {
//   var namaProdukEncoded = encodeURIComponent(namaProduk);
//   var pesan = encodeURIComponent(
//     "hallo dazaci Saya ingin membeli desain ini\nNama Produk: " +
//       namaProduk +
//       "\nHarga: Rp. " +
//       hargaProduk
//   );
//   var nomorPenjual = "6281234567890";
//   var url = "https://wa.me/" + nomorPenjual + "?text=" + pesan;
//   window.open(url);
// }

// Produk yang dipilih
var selectedProduct = {
  name: "",
  price: "",
};

function buyNow() {
  var buyerName = prompt("Masukkan nama Anda:");

  if (buyerName === null) {
    return;
  }

  var buyerEmail = prompt("Masukkan alamat email Anda:");

  if (buyerEmail === null) {
    return;
  }

  var subject = "Permintaan Pembelian: " + selectedProduct.name;
  var body =
    "Customer, " +
    buyerName +
    ", ingin membeli produk desain berikut:\n\n" +
    "Nama Produk: " +
    selectedProduct.name +
    "\n" +
    "Harga: " +
    selectedProduct.price;

  window.location.href =
    "mailto:purwodanangsumari@gmail.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body) +
    "&cc=" +
    encodeURIComponent(buyerEmail);
}

// Menampilkan detail produk
function showProductDetail(productId) {
  var imageSrc = "";
  var name = "";
  var description = "";
  var price = "";

  // Set data produk sesuai dengan ID produk yang diklik
  switch (productId) {
    case 1:
      imageSrc = "assets/img/summer.png";
      name = "Summer Hot";
      description =
        "  Seorang perempuan cantik yang sedang berolahraga menikmati hangatnya musim panas";
      price = "$20";
      break;
    case 2:
      imageSrc = "assets/img/friend.png";
      name = "Persahabatan Manis";
      description = "  2 Wanita yang manis dengan hubungan persahabatanya";
      price = "$15";
      break;
    case 3:
      imageSrc = "assets/img/dg.png";
      name = "Elaphent Fantasy";
      description = "  Kepala gajah yang memiliki aura mistik dan mencekam";
      price = "$50";
      break;
    case 4:
      imageSrc = "assets/img/women.png";
      name = "Ayu";
      description =
        "  Seorang wanita cantik yang mengenakan pakaian adat kebaya berwarna hijau";
      price = "$80";
      break;
    case 5:
      imageSrc = "assets/img/design.png";
      name = "Dazaci Members";
      description = "  Kelompok wirausahawan muda yang ingin berkarya";
      price = "$1000";
      break;
    case 6:
      imageSrc = "assets/img/botak.png";
      name = "Stronger";
      description = "  Seorang dengan gelar yang terkuat";
      price = "$60";
      break;
    case 7:
      imageSrc = "assets/img/muzan.png";
      name = "Demon king";
      description = "  Seorang dengan gelar yang terkuat";
      price = "$60";
      break;

    default:
      break;
  }

  // Menyimpan informasi produk yang dipilih
  selectedProduct.name = name;
  selectedProduct.price = price;

  // Menetapkan data produk ke elemen HTML
  document.getElementById("product-detail-image").src = imageSrc;
  document.getElementById("product-detail-name").innerText = name;
  document.getElementById("product-detail-description").innerText =
    "Keterangan Gambar:  " + description;
  document.getElementById("product-detail-price").innerText =
    "Harga:  " + price;

  // Menampilkan overlay
  document.querySelector(".product-detail-overlay").classList.add("active");
}

// Menyembunyikan detail produk
function hideProductDetail() {
  document.querySelector(".product-detail-overlay").classList.remove("active");
}
