/*
 * 北京燃气客服｜新一代技术蓝图构建方案
 * Pure browser JavaScript: no framework, server, build step, or external dependency.
 */

(function initializeBlueprintWebsite() {
  "use strict";

  const pageTitles = {
    agenda: "会议章程｜北京燃气客服新一代技术蓝图构建方案",
    blueprint: "北京燃气客服｜新一代技术蓝图构建方案",
    "work-plan": "后续技术蓝图设计工作计划｜北京燃气客服",
    research: "现状调研框架与重点问题｜北京燃气客服",
  };

  const rewireSteps = [
    {
      letter: "R",
      english: "Read the Shift",
      chinese: "识势",
      description:
        "识别行业、客服、AI、IoT 与技术架构正在发生的变化，判断企业所处的战略转折点。",
      question: "我们为什么需要变？",
    },
    {
      letter: "E",
      english: "Envision",
      chinese: "定向",
      description:
        "明确未来北燃希望形成怎样的运营体系，首先回答技术最终服务什么样的业务与运营目标。",
      question: "未来希望形成怎样的运营体系？",
    },
    {
      letter: "W",
      english: "Rewire the Work",
      chinese: "重构",
      description:
        "从核心业务场景出发，重新设计 Workflow 与人机协作，明确人员、系统、Agent 的分工和关键决策点。",
      question: "未来的工作到底应该怎么完成？",
    },
    {
      letter: "I",
      english: "Intelligence the Core",
      chinese: "筑核",
      description:
        "在新的工作方式下，识别稳定的 Digital 能力与自适应的 Intelligence 能力，构建未来数智核心。",
      question: "未来真正需要哪些数智能力？",
    },
    {
      letter: "R",
      english: "Reference Architecture",
      chinese: "架构",
      description:
        "将数智能力落到系统能力、应用架构、技术架构、基础平台与技术栈之中，形成完整目标体系。",
      question: "业务能力最终由什么技术体系承载？",
    },
    {
      letter: "E",
      english: "Execute the Evolution",
      chinese: "落地",
      description:
        "把目标体系与北燃现有系统、数据及技术基础连接起来，明确分阶段建设与持续演进路径。",
      question: "未来如何一步一步建设并实现演进？",
    },
  ];

  const pageViews = Array.from(document.querySelectorAll("[data-page]"));
  const primaryLinks = Array.from(document.querySelectorAll(".primary-nav-link[data-page-link]"));
  const pageLinks = Array.from(document.querySelectorAll("[data-page-link]"));
  const sectionLinks = Array.from(document.querySelectorAll("[data-section-link]"));
  const chapterLinks = Array.from(document.querySelectorAll(".chapter-link[data-section-link]"));
  const researchLinks = Array.from(document.querySelectorAll("[data-research-link]"));
  const rewireButtons = Array.from(document.querySelectorAll("[data-rewire-step]"));
  const progressBar = document.getElementById("reading-progress-bar");
  const chapterNav = document.getElementById("chapter-nav");
  const observedSections = Array.from(document.querySelectorAll("[data-observe-section]"));
  const observedResearchSections = Array.from(document.querySelectorAll("[data-observe-research]"));
  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let currentPage = "agenda";
  let scrollFrame = 0;

  function setDocumentHash(hash, replace) {
    if (!hash || window.location.hash === `#${hash}`) {
      return;
    }

    const updateMethod = replace ? "replaceState" : "pushState";

    try {
      window.history[updateMethod](null, "", `#${hash}`);
    } catch {
      window.location.hash = hash;
    }
  }

  function updatePage(pageName, options) {
    const settings = options || {};
    const selectedPage = Object.prototype.hasOwnProperty.call(pageTitles, pageName)
      ? pageName
      : "agenda";

    currentPage = selectedPage;

    pageViews.forEach(function toggleView(view) {
      const active = view.dataset.page === selectedPage;
      view.hidden = !active;
      view.classList.toggle("is-active", active);
    });

    primaryLinks.forEach(function togglePrimaryLink(link) {
      const active = link.dataset.pageLink === selectedPage;
      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    document.title = pageTitles[selectedPage];

    if (!settings.preserveScroll && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    if (settings.updateHash !== false) {
      setDocumentHash(selectedPage, settings.replaceHash === true);
    }

    updateReadingProgress();
  }

  function updateActiveChapter(sectionId) {
    let currentLink = null;

    chapterLinks.forEach(function markChapter(link) {
      const active = link.dataset.sectionLink === sectionId;
      link.classList.toggle("is-active", active);

      if (active) {
        currentLink = link;
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (!currentLink || !chapterNav) {
      return;
    }

    const navRect = chapterNav.getBoundingClientRect();
    const linkRect = currentLink.getBoundingClientRect();

    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
      chapterNav.scrollLeft += linkRect.left - navRect.left - navRect.width / 2 + linkRect.width / 2;
    }
  }

  function scrollToSection(sectionId, updateHash) {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    if (currentPage !== "blueprint") {
      updatePage("blueprint", { preserveScroll: true, updateHash: false });
    }

    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    updateActiveChapter(sectionId);

    if (updateHash !== false) {
      setDocumentHash(sectionId, false);
    }
  }

  function updateActiveResearchChapter(sectionId) {
    researchLinks.forEach(function markResearchChapter(link) {
      const active = link.dataset.researchLink === sectionId;
      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function scrollToResearchSection(sectionId, updateHash) {
    const section = document.getElementById(sectionId);

    if (!section || !observedResearchSections.includes(section)) {
      return;
    }

    if (currentPage !== "research") {
      updatePage("research", { preserveScroll: true, updateHash: false });
    }

    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    updateActiveResearchChapter(sectionId);

    if (updateHash !== false) {
      setDocumentHash(sectionId, false);
    }
  }

  function updateReadingProgress() {
    if (!progressBar) {
      return;
    }

    if (currentPage !== "blueprint") {
      progressBar.style.width = "0%";
      return;
    }

    const scrollableHeight = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    const progress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
    progressBar.style.width = `${(progress * 100).toFixed(2)}%`;
  }

  function queueScrollUpdate() {
    if (scrollFrame) {
      return;
    }

    scrollFrame = window.requestAnimationFrame(function refreshProgress() {
      updateReadingProgress();
      scrollFrame = 0;
    });
  }

  function activateRewireStep(index) {
    const stepIndex = Number(index);
    const step = rewireSteps[stepIndex];

    if (!step) {
      return;
    }

    rewireButtons.forEach(function updateRewireButton(button) {
      const active = Number(button.dataset.rewireStep) === stepIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const title = document.getElementById("rewire-detail-title");
    const detailIndex = document.getElementById("rewire-detail-index");
    const description = document.getElementById("rewire-detail-description");
    const question = document.getElementById("rewire-detail-question");

    if (!title || !detailIndex || !description || !question) {
      return;
    }

    detailIndex.textContent = `${String(stepIndex + 1).padStart(2, "0")} / ${step.letter}`;
    title.replaceChildren(document.createTextNode(`${step.english} `));

    const chineseTitle = document.createElement("span");
    chineseTitle.textContent = step.chinese;
    title.appendChild(chineseTitle);

    description.textContent = step.description;
    question.textContent = step.question;
  }

  function initializeRevealAnimations() {
    const revealElements = Array.from(document.querySelectorAll(".reveal"));

    if (reducedMotion || typeof window.IntersectionObserver !== "function") {
      revealElements.forEach(function showImmediately(element) {
        element.classList.add("is-visible");
      });
      return;
    }

    document.body.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      function handleReveal(entries, observer) {
        entries.forEach(function revealEntry(entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    revealElements.forEach(function observeElement(element) {
      revealObserver.observe(element);
    });
  }

  function initializeSectionObserver() {
    if (typeof window.IntersectionObserver !== "function") {
      return;
    }

    const activeObserver = new IntersectionObserver(
      function handleActiveSections(entries) {
        if (currentPage !== "blueprint") {
          return;
        }

        const visibleSections = entries.filter(function filterVisible(entry) {
          return entry.isIntersecting;
        });

        if (visibleSections.length > 0) {
          updateActiveChapter(visibleSections[visibleSections.length - 1].target.id);
        }
      },
      { threshold: 0, rootMargin: "-28% 0px -58% 0px" },
    );

    observedSections.forEach(function observeSection(section) {
      activeObserver.observe(section);
    });

    const researchObserver = new IntersectionObserver(
      function handleActiveResearchSections(entries) {
        if (currentPage !== "research") {
          return;
        }

        const visibleSections = entries.filter(function filterVisibleResearch(entry) {
          return entry.isIntersecting;
        });

        if (visibleSections.length > 0) {
          updateActiveResearchChapter(visibleSections[visibleSections.length - 1].target.id);
        }
      },
      { threshold: 0, rootMargin: "-28% 0px -58% 0px" },
    );

    observedResearchSections.forEach(function observeResearchSection(section) {
      researchObserver.observe(section);
    });
  }

  pageLinks.forEach(function attachPageNavigation(link) {
    link.addEventListener("click", function handlePageClick(event) {
      event.preventDefault();
      updatePage(link.dataset.pageLink);
    });
  });

  sectionLinks.forEach(function attachSectionNavigation(link) {
    link.addEventListener("click", function handleSectionClick(event) {
      event.preventDefault();
      scrollToSection(link.dataset.sectionLink, true);
    });
  });

  researchLinks.forEach(function attachResearchNavigation(link) {
    link.addEventListener("click", function handleResearchClick(event) {
      event.preventDefault();
      scrollToResearchSection(link.dataset.researchLink, true);
    });
  });

  rewireButtons.forEach(function attachRewireControls(button, index) {
    button.addEventListener("click", function handleRewireClick() {
      activateRewireStep(index);
    });

    button.addEventListener("keydown", function handleRewireKeyboard(event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
      }

      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + rewireButtons.length) % rewireButtons.length;
      activateRewireStep(nextIndex);
      rewireButtons[nextIndex].focus();
    });
  });

  window.addEventListener("scroll", queueScrollUpdate, { passive: true });
  window.addEventListener("resize", queueScrollUpdate, { passive: true });
  window.addEventListener("popstate", function handleHistoryNavigation() {
    const target = window.location.hash.replace(/^#/, "");

    if (Object.prototype.hasOwnProperty.call(pageTitles, target)) {
      updatePage(target, { updateHash: false });
      return;
    }

    if (observedResearchSections.some(function matchesResearchSection(section) {
      return section.id === target;
    })) {
      scrollToResearchSection(target, false);
      return;
    }

    if (document.getElementById(target)) {
      scrollToSection(target, false);
      return;
    }

    updatePage("agenda", { updateHash: false });
  });

  initializeRevealAnimations();
  initializeSectionObserver();

  const initialTarget = window.location.hash.replace(/^#/, "");

  if (Object.prototype.hasOwnProperty.call(pageTitles, initialTarget)) {
    updatePage(initialTarget, { updateHash: false, preserveScroll: true });
  } else if (observedResearchSections.some(function matchesInitialResearchSection(section) {
    return section.id === initialTarget;
  })) {
    updatePage("research", { updateHash: false, preserveScroll: true });

    window.requestAnimationFrame(function revealInitialResearchSection() {
      scrollToResearchSection(initialTarget, false);
    });
  } else if (initialTarget && document.getElementById(initialTarget)) {
    updatePage("blueprint", { updateHash: false, preserveScroll: true });

    window.requestAnimationFrame(function revealInitialSection() {
      scrollToSection(initialTarget, false);
    });
  } else {
    updatePage("agenda", { updateHash: false, preserveScroll: true });
  }
})();
