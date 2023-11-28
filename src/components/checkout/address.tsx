import { useAddressQuery } from "@framework/address/address";
import {useState} from 'react'
// import AddressGrid from "@components/address/address-grid";

// const AddressPage: React.FC = () => {
//   const { data, isLoading } = useAddressQuery();
//   return !isLoading ? (
//     <AddressGrid address={data?.data} />
//   ) : (
//     <div>Loading...</div>
//   );
// };

// export default AddressPage;

import AddressGrid from '@components/address/address-grid';
import AddressForm from "./address-form";

const AddressPage: React.FC = () => {
  const [addressData, setAddressData] = useState([])
  // const { data, isLoading } = useContactQuery();
  // return !isLoading ? (
  //   <div className="w-full max-w-[1300px] mx-auto">
  //     <div className="flex flex-wrap">
  //       <div className="w-full">
  //         {/* <ContactBox items={data} /> */}
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   <div>Loading...</div>
  // );

  return (
    <div className='w-full max-w-[1300px] mx-auto'>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
