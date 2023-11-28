/* eslint-disable no-console */
import { DatabaseReference, getDatabase, ref, set } from 'firebase/database';
import { useMutation } from 'react-query';
import firebase from '@firebase/firebase';
import Router from 'next/router';
import { MemberSignUpInputType } from '@framework/types';

function SavePhoto(e: File, fileName: number) {
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  let photo = e;

  formData.append('imageName', fileName.toString());
  formData.append('sendImage', photo);
  xhr.onreadystatechange = () => {
    console.log(xhr.status);
    console.log(xhr);
  };
  xhr.timeout = 5000;
  xhr.open('POST', 'https://offerzonebd.com/userimgapi/api.php');
  xhr.send(formData);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // var response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        alert('Application Successful to Become a Merchant');
        console.log('successful');
      } else {
        console.log('failed');
      }
    }
  };
}

function writeUserData(
  dbRef: DatabaseReference,
  memberID: number,
  name: string,
  balance: string,
  email: string,
  phone: string,
  phone2: string,
  profession: string,
  dob: string,
  reference: string,
  address: string,
  district: string,
  upazila: string,
  validTill: string,
  paymentMethod: string,
  trxID: string,
  password: string,
  profileImage: string,
  followedStores: string,
  status: string,
  membership: string,
) {
  set(dbRef, {
    UserID: memberID,
    Name: name,
    Balance: balance,
    Email: email,
    Phone: phone,
    Phone2: phone2,
    Profession: profession,
    BirthDay: dob,
    Reference: reference,
    Address: address,
    District: district,
    Upazila: upazila,
    ValidTill: validTill,
    PaymentMethod: paymentMethod,
    TrxID: trxID,
    Password: password,
    ProfileImage: profileImage,
    FollowedStores: followedStores,
    Status: status,
    Membership: membership,
    Reward: 'not',
    ReqDate: new Date(),
  });
}

async function merchantSignup(input: MemberSignUpInputType) {
  const db = getDatabase(firebase.app());
  const memberID = new Date().getTime();
  const dbRef = ref(db, 'userInfo/' + memberID);
  console.log(input);
  writeUserData(
    dbRef,
    memberID,
    input.membername,
    input.memberbalance,
    input.memberemail,
    input.memberphone,
    input.memberphone2,
    input.memberprofession,
    input.memberdob,
    input.memberref,
    input.memberaddress,
    input.memberdistrict,
    input.memberupazilla,
    input.validTill,
    input.paymentmethod,
    input.trxid,
    input.memberpassword,
    memberID + '.jpg',
    input.followedStores,
    input.status,
    input.membership,
  );

  SavePhoto(input.memberimage[0], memberID);
}
export const useMemberSignUpMutation = () => {
  return useMutation((input: MemberSignUpInputType) => merchantSignup(input), {
    onSuccess: (data) => {
      Router.push('/');
      console.log(data);
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
