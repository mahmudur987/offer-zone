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
import { AgentFormValues } from '@framework/types';
import { useAgentSignUpMutation } from '@framework/auth/use-agent-signup';

const database = getDatabase(firebase.app());

const defaultValues: AgentFormValues = {
  agentemail: '',
  agentname: Cookies.get('username') ?? '',
  agentphone: Cookies.get('phone') ?? '',
  companycategory: '',
  branchname: '',
  brancecontactperson: '',
  contactdesignation: '',
  agentaddress: '',
  agentdistrict: '',
  agentupazilla: '',
  agentrefer: '',
  companyname: '',
};

export default function AgentSignupForm() {
  const [isAlreadayAgent, setIsAlreadyAgent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgentFormValues>({
    defaultValues,
  });
  const { mutate: signup, isLoading } = useAgentSignUpMutation();

  useEffect(() => {
    const getDatabase = async () => {
      setLoading(true);
      const data = await get(query(ref(database, 'agentInfo')));

      if (data.exists()) {
        data.forEach((userData) => {
          const userinfo = userData.val();

          if (Cookies.get('phone') && userinfo.Phone === Cookies.get('phone')) {
            setIsAlreadyAgent(true);
          }
        });
      }
      setLoading(false);
    };

    getDatabase();
  }, []);

  // eslint-disable-next-line no-console
  const onSubmit = (data: AgentFormValues) => {
    signup({
      ...data,
      status: 'pending',
      followedStores: 'stores',
      givenoffers: 'offers',
      due: '0',
      paid: '0',
      agentbalance: '0',
      agentpassword: '1234',
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

  if (isAlreadayAgent) {
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
        Become an Agent
      </Heading>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className='flex flex-col justify-center'
        noValidate
        encType='multipart/form-data'
      >
        <Input
          label={t('forms:label-agentperson')}
          variant='solid'
          className='mb-4'
          {...register('agentname', {
            required: `${t('forms:agentperson-required')}`,
          })}
          error={errors.agentname?.message}
        />
        <Input
          label={t('forms:label-email')}
          type='email'
          variant='solid'
          className='mb-4'
          {...register('agentemail', {
            required: `${t('forms:email-required')}`,
          })}
          error={errors.agentemail?.message}
        />
        <Input
          label={t('forms:label-phone')}
          type='tel'
          variant='solid'
          className='mb-4'
          disabled
          {...register('agentphone', {
            required: `${t('forms:phone-required')}`,
            pattern: {
              value: /^(?:\+?88)?01[13-9]\d{8}$/,
              message: t('forms:phone-error'),
            },
          })}
          error={errors.agentphone?.message}
        />
        <Heading variant='title' className='mb-2'>
          Business Information
        </Heading>
        <Input
          label={t('forms:label-companyname')}
          variant='solid'
          className='mb-4'
          {...register('companyname', {
            required: `${t('forms:companyname-required')}`,
          })}
          error={errors.companyname?.message}
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
          label={t('forms:label-agentrefer')}
          variant='solid'
          className='mb-4'
          {...register('agentrefer', {
            required: `${t('forms:merchantaddress-required')}`,
          })}
          error={errors.agentrefer?.message}
        />
        <Input
          label={t('forms:label-agentaddress')}
          variant='solid'
          className='mb-4'
          {...register('agentaddress', {
            required: `${t('forms:agentaddress-required')}`,
          })}
          error={errors.agentaddress?.message}
        />
        <Input
          label={t('forms:label-merchantdistrict')}
          variant='solid'
          className='mb-4'
          {...register('agentdistrict', {
            required: `${t('forms:agentdistrict-required')}`,
          })}
          error={errors.agentdistrict?.message}
        />
        <Input
          label={t('forms:label-agentupazilla')}
          variant='solid'
          className='mb-4'
          {...register('agentupazilla', {
            required: `${t('forms:agentupazilla-required')}`,
          })}
          error={errors.agentupazilla?.message}
        />

        <Input
          label={t('forms:label-agentimage')}
          type='file'
          variant='solid'
          className='mb-4'
          {...register('agentimage', {
            required: `${t('forms:agentimage-required')}`,
          })}
          error={errors.agentimage?.message}
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
