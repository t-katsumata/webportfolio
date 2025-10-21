import tippy from "tippy.js";
import type { Props } from "tippy.js";

export default {
  mounted(el: HTMLElement, binding: { value: string | Props }) {
    if (typeof binding.value === "string") {
      tippy(el, { content: binding.value });
    } else {
      tippy(el, binding.value);
    }
  },
};
