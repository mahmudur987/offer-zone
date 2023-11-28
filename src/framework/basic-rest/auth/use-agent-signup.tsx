/* eslint-disable no-console */
import { DatabaseReference, getDatabase, ref, set } from 'firebase/database';
import { useMutation } from 'react-query';
import firebase from '@firebase/firebase';
import Router from 'next/router';
import { AgentSignUpInputType } from '@framework/types';

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
  xhr.open('POST', 'https://offerzonebd.com/agentimgapi/api.php');
  xhr.send(formData);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('successful');
      } else {
        throw new Error('Application failed!!');
      }
    }
  };
}

function writeUserData(
  dbRef: DatabaseReference,
  agentID: number,
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
    AgentID: agentID,
    Aperson: name,
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

async function agentSignup(input: AgentSignUpInputType) {
  const db = getDatabase(firebase.app());
  const agentID = new Date().getTime();
  const dbRef = ref(db, 'agentInfo/' + agentID);
  writeUserData(
    dbRef,
    agentID,
    input.agentbalance,
    input.agentemail,
    input.agentphone,
    input.agentname,
    input.companycategory,
    input.branchname,
    input.brancecontactperson,
    input.contactdesignation,
    input.agentrefer,
    input.agentaddress,
    input.agentdistrict,
    input.agentupazilla,
    input.agentpassword,
    agentID + '.jpg',
    input.followedStores,
    input.givenoffers,
    input.status,
    input.due,
    input.paid,
  );
  if (input.agentimage) SavePhoto(input.agentimage[0], agentID);
}
export const useAgentSignUpMutation = () => {
  return useMutation((input: AgentSignUpInputType) => agentSignup(input), {
    onSuccess: () => {
      Router.push('/');
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
