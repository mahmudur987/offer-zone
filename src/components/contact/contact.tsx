// import { useContactQuery } from "@framework/contact/contact";
// import ContactBox from "@components/contact/contact-content";

import ContactBox from './contact-content';

const ContactPage: React.FC = () => {
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
          <ContactBox />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
