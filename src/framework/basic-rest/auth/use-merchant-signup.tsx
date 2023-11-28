/* eslint-disable no-console */
import { DatabaseReference, getDatabase, ref, set } from 'firebase/database';
import { useMutation } from 'react-query';
import firebase from '@firebase/firebase';
import Router from 'next/router';

export interface MerchantSignUpInputType {
  merchantemail: string;
  merchantperson: string;
  merchantphone: string;
  merchantname: string;
  merchantbalance: string;
  companycategory: string;
  branchname: string;
  brancecontactperson: string;
  contactdesignation: string;
  merchantaddress: string;
  merchantdistrict: string;
  merchantupazilla: string;
  merchantrefer: string;
  merchantpassword: string;
  merchantimage: FileList;
  status: 'pending';
  followedStores: 'stores';
  givenOffers: 'offers';
  due: '0';
  paid: '0';
}

function SavePhoto(e: File, fileName: number) {
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  let photo = e;

  formData.append('imageName', fileName.toString());
  formData.append('sendImage', photo);
  xhr.onreadystatechange = () => {
    console.log(xhr.status);
    console.log(xhr);
  }; // err handling
  xhr.timeout = 5000;
  xhr.open('POST', 'https://offerzonebd.com/merchantimgapi/api.php');
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
  merchantID: number,
  mperson: string,
  balance: string,
  email: string,
  phone: string,
  name: string,
  comcat: string,
  branch: string,
  contactperson: string,
  contactdesignation: string,
  reference: string,
  address: string,
  district: string,
  upazila: string,
  password: string,
  profileImage: string,
  followedStores: string,
  givenOffers: string,
  status: string,
  due: string,
  paid: string,
) {
  set(dbRef, {
    MerchantID: merchantID,
    Mperson: mperson,
    Balance: balance,
    Email: email,
    Phone: phone,
    Name: name,
    Category: comcat,
    BranchName: branch,
    ContactPerson: contactperson,
    ContactDesignation: contactdesignation,
    Reference: reference,
    Address: address,
    District: district,
    Upazila: upazila,
    Password: password,
    ProfileImage: profileImage,
    FollowedStores: followedStores,
    GivenOffers: givenOffers,
    Status: status,
    Due: due,
    Paid: paid,
    Reward: 'not',
    ReqDate: new Date(),
  });
}

async function merchantSignup(input: MerchantSignUpInputType) {
  const db = getDatabase(firebase.app());
  const merchantID = new Date().getTime();
  const dbRef = ref(db, 'merchantInfo/' + merchantID);
  console.log(input);
  writeUserData(
    dbRef,
    merchantID,
    input.merchantperson,
    input.merchantbalance,
    input.merchantemail,
    input.merchantphone,
    input.merchantname,
    input.companycategory,
    input.branchname,
    input.brancecontactperson,
    input.contactdesignation,
    input.merchantrefer,
    input.merchantaddress,
    input.merchantdistrict,
    input.merchantupazilla,
    input.merchantpassword,
    merchantID + '.jpg',
    input.followedStores,
    input.givenOffers,
    input.status,
    input.due,
    input.paid,
  );
  SavePhoto(input.merchantimage[0], merchantID);
}
export const useMerchantSignUpMutation = () => {
  return useMutation(
    (input: MerchantSignUpInputType) => merchantSignup(input),
    {
      onSuccess: (data) => {
        Router.push('/');
        console.log(data);
      },
      onError: (data) => {
        console.log(data, 'login error response');
      },
    },
  );
};
