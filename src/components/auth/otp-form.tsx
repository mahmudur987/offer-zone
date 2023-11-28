import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import Logo from '@components/ui/logo';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import Switch from '@components/ui/switch';
import cn from 'classnames';
import CloseButton from '@components/ui/close-button';
import { useModalAction } from '@components/common/modal/modal.context';

interface OtpFormProps {
  otp: number;
  className?: string;
}

const OtpForm: React.FC<OtpFormProps> = ({ otp, className }) => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const { mutate: login, isLoading } = useLoginMutation();
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  const onSubmit: SubmitHandler<LoginInputType> = ({
    name,
    phone,
    remember_me,
  }) => {
    login({
      name,
      phone,
      remember_me,
    });
    closeModal();
  };
  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className,
      )}
    >
      <div className='flex mx-auto overflow-hidden rounded-lg bg-brand-light'>
        <div className='md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative'>
          <Image
            src='/assets/images/login.png'
            alt='signin Image'
            layout='fill'
          />
        </div>
        <div className='w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center'>
          <div className='mb-6 text-center'>
            <div>
              <Logo />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center'
            noValidate
          >
            <div className='flex flex-col space-y-3.5'>
              <Input
                label={t('forms:label-name-star')}
                type='tel'
                variant='solid'
                {...register('phone', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value: /^(?:\+?88)?01[13-9]\d{8}$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.phone?.message}
              />
              <div className='flex items-center justify-center'>
                <div className='flex items-center shrink-0'>
                  <label className='relative inline-block cursor-pointer switch'>
                    <Switch checked={remember} onChange={setRemember} />
                  </label>
                  <label
                    htmlFor='remember'
                    className='mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5'
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
              </div>
              <div className='relative'>
                <Button
                  type='submit'
                  loading={isLoading}
                  disabled={isLoading}
                  className='w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px'
                  variant='formButton'
                >
                  {t('common:text-sign-in')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
