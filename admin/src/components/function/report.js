import axios from "axios";

export const keepReport = async (idreport, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/keepReport`,
      { idreport },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const removeReport = async (
  idreport,
  postRef,
  commentRef,
  userReportedRef,
  groupReportedRef,
  token
) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/removeReport`,
      {
        idreport: idreport,
        postRef: postRef,
        commentRef: commentRef,
        userReportedRef: userReportedRef,
        groupReportedRef: groupReportedRef,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
