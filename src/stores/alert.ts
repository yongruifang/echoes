import { defineStore } from "pinia";
import { ref } from "vue";

type AlertType = "success" | "error" | "warning" | "info";
type AlertArgs = {
    type: AlertType;
    message: string;
    show: boolean;
    autoClose: boolean;
}
export const useAlertStore = defineStore("alert", () => {
    const type = ref<AlertType>("success");
    const message = ref("Hello");
    const show = ref(false);
    const autoClose = ref(true);
    function setAlert(alertArgs: AlertArgs) {
        type.value = alertArgs.type;
        message.value = alertArgs.message;
        show.value = alertArgs.show;
        autoClose.value = alertArgs.autoClose;
    }
    function toggleClose() {
        show.value = false;
    }
    return {
        type,
        message,
        show,
        autoClose,
        setAlert,
        toggleClose
    }
});
