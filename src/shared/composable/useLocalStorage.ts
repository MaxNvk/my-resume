import { onMounted, onUnmounted, ref } from "vue";
import { EventBus } from "@/shared/utils/event-bus.util";

type TValueType = string | number | null | undefined;

export const useLocalStorage = (
  storageKey: string,
  defaultValue?: TValueType
) => {
  const eventBusKey = `${storageKey}-change`;
  const offEventBus = ref<null | (() => unknown)>(null);

  const storageValue = ref(null);

  const getStorageValue = () => {
    const value = localStorage.getItem(storageKey);
    storageValue.value = value;

    return value;
  };

  const rawSetStorageValue = (newVal: TValueType, triggerBus?: true) => {
    localStorage.setItem(storageKey, newVal);
    storageValue.value = newVal;

    if (!triggerBus) return;

    EventBus.dispatch(eventBusKey);
  };

  const setStorageValue = (newVal: TValueType) => {
    rawSetStorageValue(newVal, true);
  };

  onMounted(() => {
    const value = getStorageValue();
    if (!value) {
      rawSetStorageValue(defaultValue);
      getStorageValue();
    }

    const { off } = EventBus.on(eventBusKey, () => {
      getStorageValue();
    });

    offEventBus.value = off;
  });

  onUnmounted(() => {
    offEventBus.value?.();
  });

  return { storageValue, setStorageValue };
};
