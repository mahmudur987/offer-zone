import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useLoginMutation,
  LoginInputType,
  OtpInputType,
  useOtpMutation,
} from '@framework/auth/use-login';
import Logo from '@components/ui/logo';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import Switch from '@components/ui/switch';
import cn from 'classnames';
import CloseButton from '@components/ui/close-button';
import { useModalAction } from '@components/common/modal/modal.context';
import Alert from '@components/ui/alert';

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const {
    mutate: login,
    isLoading: isLoadingOne,
    // isSuccess: isSuccessOne,
  } = useLoginMutation();

  const { mutate: setCookies, isLoading: isLoadingTwo } = useOtpMutation();

  const [otp, setOtp] = useState<number | null>(null);
  const [remember, setRemember] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType & OtpInputType>();

  const onSubmit: SubmitHandler<LoginInputType & OtpInputType> = ({
    name,
    phone,
    otpInput,
  }) => {
    if (!otp) {
      const randomOtp = Math.floor(1000 + Math.random() * 9000);
      login({
        name,
        phone,
        message: `Your Offer Zone (offerzonebd.com) OTP Code is ${randomOtp}`,
      });
      setOtp(randomOtp);
    } else {
      if (otp === Number(otpInput)) {
        setCookies({
          name,
          phone,
          message: '',
        });
      } else {
        setOtpError('Invalid Otp!!! Try Again');
      }
    }
  };
  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className,
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
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
              {!otp ? (
                <>
                  <Input
                    label={t('forms:label-phone')}
                    variant='solid'
                    {...register('phone', {
                      required: `${t('forms:phone-required')}`,
                      pattern: {
                        value: /^(?:\+?88)?01[13-9]\d{8}$/,
                        message: t('forms:phone-error'),
                      },
                    })}
                    error={errors.phone?.message}
                  />
                  <Input
                    label={t('forms:label-name-star')}
                    type='text'
                    variant='solid'
                    {...register('name', {
                      required: `${t('forms:name-required')}`,
                    })}
                    error={errors.name?.message}
                  />
                </>
              ) : (
                <>
                  {otpError && <Alert message={otpError} />}
                  <Input
                    label={t('forms:label-otp')}
                    type='number'
                    variant='solid'
                    {...register('otpInput', {
                      validate: (v) => v <= 9999 || t('forms:otp-required'),
                      required: `${t('forms:otp-required')}`,
                    })}
                    error={errors.otpInput?.message}
                  />

                  <Switch
                    label='Remember me'
                    checked={remember}
                    onChange={setRemember}
                  />
                </>
              )}

              <div className='relative'>
                <Button
                  type='submit'
                  loading={isLoadingOne || isLoadingTwo}
                  disabled={isLoadingOne || isLoadingTwo}
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

export default LoginForm;
