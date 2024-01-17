import http from "@framework/utils/http";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const fetchAddress = async () => {
  const { data } = await http.get("customers/shipping-address/");
  return data;
};

const useAddressQuery = () => {
  return useQuery(["customers/shipping-address"], fetchAddress);
};

const fetchUpdataAddress = async (newData: any) => {
  const { data } = await http.post("customers/shipping-address/", newData);
  return data;
};

const useUpdataAddressMutation = () => {
  const { refetch } = useAddressQuery();

  return useMutation((input: any) => fetchUpdataAddress(input), {
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("your address update success fully", { toastId: 5 });
      refetch();
    },
    onError: (data: any) => {
      if (data?.response?.data?.detail) {
        toast.error(data?.response?.data?.detail, {
          toastId: 55,
        });
        return;
      }
      toast.error(
        "Some Error Happen please try again with valid Email and Password",
        { toastId: 2 }
      );
    },
  });
};

export { useAddressQuery, fetchAddress, useUpdataAddressMutation };
