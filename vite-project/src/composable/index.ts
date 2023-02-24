import { ref } from "vue";
import { followOrUnfollow } from "@/api/consult";
import { FollowType } from "@/types/consult";

/**
 *
 * @param {FollowType} type
 * @returns {object} data
 * @param {Boolean} loading
 * @param {Function} follow
 */
export const useFollow = (type: FollowType = "doc") => {
  const loading = ref(false);
  /**
   *
   * @param {object} item
   * @param {string} item.id
   * @param {0|1} item.likeFlag
   * @return
   */
  const follow = (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true;
    followOrUnfollow(item.id, type)
      .then((res) => {
        item.likeFlag = item.likeFlag === 1 ? 0 : 1;
      })
      .finally(() => (loading.value = false));
  };
  return { loading, follow };
};
