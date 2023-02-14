import CpNavBarVue from "@/components/CpNavBar.vue";

declare module "vue" {
  interface GlobalComponents {
    CpNavBarVue: typeof CpNavBarVue;
  }
}
