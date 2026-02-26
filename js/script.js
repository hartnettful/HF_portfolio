const gnav = document.querySelector(".gnav-inner");

// 最初にgnavの位置（ページの一番上からの距離）を取得
const gnavOffsetTop = gnav.offsetTop;

window.addEventListener("scroll", function () {
  // ハンバーガーメニューが表示される幅では固定しない
  if (window.innerWidth <= 560) return;

  if (window.scrollY > gnavOffsetTop) {
    gnav.classList.add("gnav-fixed");
  } else {
    gnav.classList.remove("gnav-fixed");
  }
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const gnavInner = document.querySelector(".gnav-inner");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("show");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 560) {
    mobileMenu.classList.remove("show");
    hamburger.classList.remove("active");
    gnavInner.style.display = "block";
  } else {
    gnavInner.style.display = "none";
  }
});

// 初回ロード時も判定（リロード対策）
window.addEventListener("load", () => {
  if (window.innerWidth <= 560) {
    gnavInner.style.display = "none";
  }
});

// モバイルメニュー内のリンクをすべて取得
const mobileMenuLinks = mobileMenu.querySelectorAll("a");

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // メニューを閉じる処理
    mobileMenu.classList.remove("show");
    hamburger.classList.remove("active");
  });
});

window.addEventListener("scroll", function () {
  const hamburger = document.getElementById("hamburger");

  if (window.innerWidth <= 560) {
    if (window.scrollY > 100) {
      hamburger.classList.add("fixed");
    } else {
      hamburger.classList.remove("fixed");
    }
  }
});

// 2カラムをタブ切替
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const wrappers = document.querySelectorAll(".column-wrapper");

  function setActive(tab) {
    // ボタン切り替え
    tabButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.tab === tab)
    );
    // コンテンツ切り替え
    wrappers.forEach((wrap) => {
      if (tab === "direction") {
        wrap.querySelector(".dw-title")
          ? wrap.classList.add("active")
          : wrap.classList.remove("active");
      } else {
        wrap.querySelector(".cw-title")
          ? wrap.classList.add("active")
          : wrap.classList.remove("active");
      }
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(btn.dataset.tab);
    });
  });

  // 初期化：モバイルではDIRECTIONを表示
  if (window.innerWidth <= 720) {
    setActive("direction");
  }
});

// メールアドレスコピー
document.querySelector(".copy-icon").addEventListener("click", function () {
  const text = document.querySelector(".mail").textContent;
  navigator.clipboard.writeText(text).then(() => {
    this.classList.add("copied");
    setTimeout(() => this.classList.remove("copied"), 2000);
  });
});

// ナビボタンのページ内リンク
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const headerHeight =
      document.querySelector(".gnav-fixed")?.offsetHeight || 80; // ヘッダーの高さを指定

    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ページトップボタン
const button = document.querySelector(".page-top");

button.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    button.classList.add("is-active");
  } else {
    button.classList.remove("is-active");
  }
});

// キャリアのトグル
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("checkbox");
  const showTargets = document.querySelectorAll(
    ".career-inner, .career-det, .career-answer"
  );
  const hideTargets = document.querySelectorAll(
    ".career-off, .career-q, .career-q2"
  );

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      // 表示する側
      showTargets.forEach((el) => {
        el.classList.remove("career-hidden", "fade-out-up");
        el.classList.add("fade-in");
        setTimeout(() => {
          el.classList.add("show");
        }, 10);
      });

      // 消す側（上に引っ込む）
      hideTargets.forEach((el) => {
        el.classList.remove("fade-in", "show");
        el.classList.add("fade-out-up");
        setTimeout(() => {
          el.classList.remove("fade-out-up");
          el.classList.add("career-hidden");
        }, 500);
      });
    } else {
      // レバー戻したとき：再表示
      hideTargets.forEach((el) => {
        el.classList.remove("career-hidden", "fade-out-up");
        el.classList.add("fade-in");
        setTimeout(() => {
          el.classList.add("show");
        }, 10);
      });

      // 表示を消す側（上に引っ込む）
      showTargets.forEach((el) => {
        el.classList.remove("fade-in", "show");
        el.classList.add("fade-out-up");
        setTimeout(() => {
          el.classList.remove("fade-out-up");
          el.classList.add("career-hidden");
        }, 500);
      });
    }
  });
});

// スクロールの詳細画像
const modalOverlay = document.querySelector(".modal-overlay");
const modalImg = document.getElementById("modal-img");
const cards = document.querySelectorAll(".card img");

// クリックでモーダル表示
cards.forEach((img) => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modalOverlay.classList.add("active");
  });
});

// モーダルの背景クリックで閉じる
modalOverlay.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  modalImg.src = "";
});

// モーダルの中身クリックでは閉じないように
document.querySelector(".modal-content").addEventListener("click", (e) => {
  e.stopPropagation();
});
