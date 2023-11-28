import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import Input from '@components/ui/form/input';
import Heading from '@components/ui/heading';
import Cookies from 'js-cookie';
import Select from '@components/ui/form/select';
import { get, getDatabase, query, ref } from 'firebase/database';
import firebase from '@firebase/firebase';
import { useMerchantSignUpMutation } from '@framework/auth/use-merchant-signup';

const database = getDatabase(firebase.app());

type FormValues = {
  merchantperson: string;
  merchantemail: string;
  merchantphone: string;
  companycategory: string;
  merchantname: string;
  branchname: string;
  brancecontactperson: string;
  contactdesignation: string;
  merchantaddress: string;
  merchantdistrict: string;
  merchantupazilla: string;
  merchantrefer: string;
  merchantpassword: string;
  merchantimage?: File;
};

const defaultValues = {
  merchantemail: '',
  merchantperson: Cookies.get('username') ?? '',
  merchantphone: Cookies.get('phone') ?? '',
  merchantname: '',
  companycategory: '',
  branchname: '',
  brancecontactperson: '',
  contactdesignation: '',
  merchantaddress: '',
  merchantdistrict: '',
  merchantupazilla: '',
  merchantrefer: '',
  merchantpassword: '',
};

export default function MerchantSignupForm() {
  const [isAlreadayMerchant, setIsAlreadyMerchant] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const {
    mutate: signup,
    isLoading: isLoading,
    // isSuccess: isSuccessOne,
  } = useMerchantSignUpMutation();

  useEffect(() => {
    const getDatabase = async () => {
      setLoading(true);
      const data = await get(query(ref(database, 'merchantInfo')));

      if (data.exists()) {
        data.forEach((userData) => {
          const userinfo = userData.val();

          if (Cookies.get('phone') && userinfo.Phone === Cookies.get('phone')) {
            setIsAlreadyMerchant(true);
          }
        });
      }
      setLoading(false);
    };

    getDatabase();
  }, []);

  // eslint-disable-next-line no-console
  const onSubmit = (data: any) => {
    signup({
      ...data,
      status: 'pending',
      followedStores: 'stores',
      givenOffers: 'offers',
      due: '0',
      paid: '0',
      merchantbalance: '0',
    });
  };

  if (loading) {
    return (
      <div className=' min-h-full flex items-start justify-center'>
        <Heading variant='titleLarge' className='mt-10'>
          Loading...
        </Heading>
      </div>
    );
  }

  if (isAlreadayMerchant) {
    return (
      <div className=' min-h-full flex items-start justify-center'>
        <Heading variant='titleLarge' className='mt-10'>
          You are Already a merchant!!
        </Heading>
      </div>
    );
  }

  return (
    <div className='sm:w-full md:w-1/2 md:mx-auto bg-gray-100 p-5 my-5'>
      <Heading variant='titleLarge' className='mb-2'>
        Become a Merchant
      </Heading>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className='flex flex-col justify-center'
        noValidate
        encType='multipart/form-data'
      >
        <Input
          label={t('forms:label-merchantperson')}
          variant='solid'
          className='mb-4'
          {...register('merchantperson', {
            required: `${t('forms:merchantperson-required')}`,
          })}
          error={errors.merchantperson?.message}
        />
        <Input
          label={t('forms:label-email')}
          type='email'
          variant='solid'
          className='mb-4'
          {...register('merchantemail', {
            required: `${t('forms:email-required')}`,
          })}
          error={errors.merchantemail?.message}
        />
        <Input
          label={t('forms:label-phone')}
          type='tel'
          variant='solid'
          className='mb-4'
          disabled
          {...register('merchantphone', {
            required: `${t('forms:phone-required')}`,
            pattern: {
              value: /^(?:\+?88)?01[13-9]\d{8}$/,
              message: t('forms:phone-error'),
            },
          })}
          error={errors.merchantphone?.message}
        />
        <Heading variant='title' className='mb-2'>
          Business Information
        </Heading>
        <Input
          label={t('forms:label-merchantname')}
          variant='solid'
          className='mb-4'
          {...register('merchantname', {
            required: `${t('forms:merchantname-required')}`,
          })}
          error={errors.merchantname?.message}
        />

        <Select
          label={t('forms:label-companycategory')}
          className='mb-4'
          {...register('companycategory', {
            required: `${t('forms:companycategory-required')}`,
          })}
          error={errors.companycategory?.message}
        >
          <option value='' disabled>
            Choose your category
          </option>
          <option value='Food'>Food</option>
          <option value='Clothing'>Clothing</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Mobiles'>Mobiles</option>
          <option value='Recharges'>Recharges</option>
          <option value='Gifts'>Gifts</option>
          <option value='Electronics'>Electronics</option>
          <option value='Travels'>Travels</option>
          <option value='eCommerce'>eCommerce</option>
          <option value='Laptop'>Laptop</option>
          <option value='Footwear'>Footwear</option>
          <option value='Transport'>Transport</option>
          <option value='Banks'>Banks</option>
          <option value='Pharmacy'>Pharmacy</option>
          <option value='Furniture'>Furniture</option>
          <option value='Hotels'>Hotels</option>
          <option value='Health'>Health</option>
          <option value='Grocery'>Grocery</option>
          <option value='Bags'>Bags</option>
          <option value='Innerwear'>Innerwear</option>
          <option value='IT'>IT</option>
          <option value='Jewellery'>Jewellery</option>
          <option value='Automobiles'>Automobiles</option>
          <option value='Computer'>Computer</option>
          <option value='Books'>Books</option>
          <option value='Kids'>Kids</option>
          <option value='Property'>Property</option>
          <option value='Insurance'>Insurance</option>
          <option value='Stationary'>Stationary</option>
          <option value='Education'>Education</option>
          <option value='Sports'>Sports</option>
          <option value='Accessories'>Accessories</option>
          <option value='Beauty'>Beauty</option>
          <option value='Household'>Household</option>
          <option value='Agro'>Agro</option>
          <option value='Home'>Home</option>
        </Select>

        <Input
          label={t('forms:label-branchname')}
          variant='solid'
          className='mb-4'
          {...register('branchname', {
            required: `${t('forms:branchname-required')}`,
          })}
          error={errors.branchname?.message}
        />
        <Input
          label={t('forms:label-brancecontactperson')}
          variant='solid'
          className='mb-4'
          {...register('brancecontactperson', {
            required: `${t('forms:brancecontactperson-required')}`,
          })}
          error={errors.brancecontactperson?.message}
        />
        <Input
          label={t('forms:label-contactdesignation')}
          variant='solid'
          className='mb-4'
          {...register('contactdesignation', {
            required: `${t('forms:contactdesignation-required')}`,
          })}
          error={errors.contactdesignation?.message}
        />
        <Input
          label={t('forms:label-merchantaddress')}
          variant='solid'
          className='mb-4'
          {...register('merchantaddress', {
            required: `${t('forms:merchantaddress-required')}`,
          })}
          error={errors.merchantaddress?.message}
        />
        <Input
          label={t('forms:label-merchantdistrict')}
          variant='solid'
          className='mb-4'
          {...register('merchantdistrict', {
            required: `${t('forms:merchantdistrict-required')}`,
          })}
          error={errors.merchantdistrict?.message}
        />
        <Input
          label={t('forms:label-merchantupazilla')}
          variant='solid'
          className='mb-4'
          {...register('merchantupazilla', {
            required: `${t('forms:merchantupazilla-required')}`,
          })}
          error={errors.merchantupazilla?.message}
        />

        <Input
          label={t('forms:label-merchantrefer')}
          variant='solid'
          className='mb-4'
          {...register('merchantrefer', {
            required: `${t('forms:merchantrefer-required')}`,
          })}
          error={errors.merchantrefer?.message}
        />

        <Input
          label={t('forms:label-merchantimage')}
          type='file'
          variant='solid'
          className='mb-4'
          {...register('merchantimage', {
            required: `${t('forms:merchantimage-required')}`,
          })}
          error={errors.merchantimage?.message}
        />

        <Button
          loading={isLoading}
          type='submit'
          variant='formButton'
          className='w-full mt-0 h-11 md:h-12'
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
