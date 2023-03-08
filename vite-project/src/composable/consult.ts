import {
  getPrescriptionPic,
  cancelOrder,
  followOrUnfollow,
  deleteOrder,
} from "@/api/consult";
import { OrderType } from "@/enums/hospital";
import type { ConsultOrderItem } from "@/types/consult";
import { ImagePreview, Toast } from "vant";
import { ref } from "vue";

export const useShowPrescrition = () => {
  const showPrescription = (id?: string) => {
    if (id) {
      getPrescriptionPic(id).then((res) => {
        ImagePreview([res.data.url]);
      });
    }
  };
  return { showPrescription };
};

export const useCancelOrder = () => {
  const loading = ref(false);
  const cancelConsultOrder = (item: ConsultOrderItem) => {
    loading.value = true;
    cancelOrder(item.id)
      .then((res) => {
        item.status = OrderType.ConsultCancel;
        item.statusValue = "已取消";
        Toast.success("取消成功");
      })
      .catch(() => {
        Toast.fail("取消失败");
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { cancelConsultOrder, loading };
};

export const useDeleteOrder = (callback: () => void) => {
  const deleteLoading = ref(false);
  const deleteConsultOrder = (item: ConsultOrderItem) => {
    deleteLoading.value = true;
    deleteOrder(item.id)
      .then((res) => {
        Toast.success("删除成功");
        callback && callback();
      })
      .catch((err) => Toast.fail("删除失败"))
      .finally(() => {
        deleteLoading.value = false;
      });
  };

  return { deleteLoading, deleteConsultOrder };
};
