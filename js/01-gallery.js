import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const galleryImages = galleryItems
	.map(({ preview, original, description }) => {
		return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
	})
	.join("");
gallery.insertAdjacentHTML("beforeEnd", galleryImages);

gallery.addEventListener("click", clickHandler);

function clickHandler(event) {
	event.preventDefault();
	if (event.target.nodeName !== "IMG") {
		return;
	}
	const largeImg = event.target.dataset.source;
	const instance = basicLightbox.create(
		`
        <div>
            <img src="${largeImg}" class="original__image" alt="${event.target.alt}"/>
    	</div>`,
		{
			onShow: (instance) => {
				window.addEventListener("keydown", onEscPress);
				instance.element().addEventListener("click", () => instance.close());
			},
			onClose: () => {
				window.removeEventListener("keydown", onEscPress);
			},
		}
	);
	instance.show();

	function onEscPress(event) {
		if (event.code !== "Escape") {
			return;
		}
		instance.close();
	}
}
