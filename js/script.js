"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');
} else {
	document.body.classList.add('_pc');
}

/*	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu_arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}
} else {
	document.body.classList.add('_pc');
}*/

// Меню бургер
const iconMenu = document.querySelector('.header__menu-icon');
const menuBody = document.querySelector('.menu__list');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock')
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}




// swiper

const infoSliderSpeed = 1500;

const bodyStyles = getComputedStyle(document.body);
const infoBar = bodyStyles.getPropertyValue('--info-slider-speed');
document.body.style.setProperty('--info-slider-speed', infoSliderSpeed + 'ms');

let infoSlider = new Swiper('.info-slider', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	speed: infoSliderSpeed,
	autoplay: {
		delay: 3000,
	},
	pagination: {
		el: '.swiper-pagination',
		type: "bullets",
		clickable: true,
		//dynamicBullets: true,
		//type: 'fraction',
	},
	on: {
		init: function () {
			const paginationBullets = document.querySelectorAll('.info-slider__pag .swiper-pagination-bullet');

			paginationBullets.forEach(el => {
				el.innerHTML = `<span class="info-slider__bar"></span>`
			})
		}
	},
	//spaceBetween: 0,

	// автонастройка высоты слайдера
	autoHeight: true,

	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	/*
	mousewheel: {
		// чувствительность колеса мыши
		sensitivity: 1,
		// класс объекта на котором
		// будет срабатывать прокрутка мышью
		// при многочисленных слайдерах
		// будут срабатывать все одновременно
		evensTarget: ".info-slider"
	},
	*/
});


//Play and Pause button

let button = document.querySelector('.video-block__btn-play');
let videoBody = document.querySelector('.video-block__body');
let video = document.querySelector('video');
let pauseTime = video.currentTime;
button.onclick = function () {
	button.classList.add('active');
	videoBody.classList.add('active');
	if (video.paused) {
		video.play();
		video.controls = true;
	} else {
		video.pause();
		video.controls = false;
		video.load();
	}
};

let cardSlider = new Swiper('.card-slider', {
	navigation: {
		nextEl: '.projects__btn-next',
		prevEl: '.projects__btn-prev'
	},
	autoHeight: true,
	// Брейкпойнты
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 40
		},
		660: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		1000: {
			slidesPerView: 3,
			spaceBetween: 20
		},
		1100: {
		slidesPerView: 3,
		spaceBetween: 30,
		},
	},
	autoplay: {
		delay: 3000,
		loop: true
	},
});

let clientsSlider = new Swiper('.clients-slider', {
	navigation: {
		nextEl: '.clients-slider__next',
		prevEl: '.clients-slider__prev'
	},
	autoHeight: true,
	slidesPerView: 1,
	spaceBetween: 50,
});

$(function () {
	$('.footer__bottom-link').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
});