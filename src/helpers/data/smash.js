import birthdayData from './birthdayData';
import userData from './userData';
import userContributorData from './userContributorData';
import toastData from './toastData';

const getBirthdaysWithGuestsOfHonor = (creatorUid) => new Promise((resolve, reject) => {
  birthdayData.getBirthdaysByCreatorUid(creatorUid).then((birthdays) => {
    userData.getUsers().then((users) => {
      const finalBirthdays = [];
      birthdays.forEach((birthday) => {
        const thisBirthday = { guestOfHonor: '', ...birthday };
        const guestOfHonor = users.find((user) => user.uid === thisBirthday.guestOfHonorUid);
        thisBirthday.guestOfHonor = guestOfHonor.displayName;
        finalBirthdays.push(thisBirthday);
      });
      resolve(finalBirthdays);
    });
  })
    .catch((err) => reject(err));
});

const getInvitedBirthdaysByUserUid = (userUid) => new Promise((resolve, reject) => {
  userData.getUserByUid(userUid).then((user) => {
    const currentUser = user[0];
    const userId = currentUser.id;
    userContributorData.getUserContributorsByUserId(userId).then((userContributors) => {
      birthdayData.getBirthdays().then((birthdays) => {
        userData.getUsers().then((users) => {
          const finalBirthdays = [];
          userContributors.forEach((singleUC) => {
            const invitedBirthday = birthdays.find((birthday) => birthday.id === singleUC.birthdayId);
            if (invitedBirthday !== undefined) {
              const guestOfHonor = users.find((x) => x.uid === invitedBirthday.guestOfHonorUid);
              invitedBirthday.guestOfHonor = guestOfHonor.displayName;
              finalBirthdays.push(invitedBirthday);
            }
          });
          resolve(finalBirthdays);
        });
      });
    });
  })
    .catch((err) => reject(err));
});

const getSingleBirthdayWithGuestOfHonorAndInvitations = (birthdayId) => new Promise((resolve, reject) => {
  birthdayData.getBirthdayById(birthdayId)
    .then((response) => {
      const birthday = response.data;
      birthday.invitations = [];
      userData.getUsers().then((users) => {
        userContributorData.getUserContributorsByBirthdayId(birthdayId).then((userContributors) => {
          const guestOfHonor = users.find((x) => x.uid === birthday.guestOfHonorUid);
          birthday.guestOfHonor = guestOfHonor.displayName;
          userContributors.forEach((userContributor) => {
            const thisUserContributor = { invitedUserName: '', ...userContributor };
            const invitedUser = users.find((x) => x.id === userContributor.userId);
            thisUserContributor.invitedUserName = invitedUser.displayName;
            birthday.invitations.push(thisUserContributor);
          });
          resolve(birthday);
        });
      });
    })
    .catch((err) => reject(err));
});

const getToastsWithContributorNameByBirthdayId = (birthdayId) => new Promise((resolve, reject) => {
  toastData.getToastsByBirthdayId(birthdayId).then((toasts) => {
    userData.getUsers().then((users) => {
      const finalToasts = [];
      toasts.forEach((singleToast) => {
        const thisToast = { contributorName: '', ...singleToast };
        const contributor = users.find((x) => x.uid === thisToast.uid);
        thisToast.contributorName = contributor.displayName;
        finalToasts.push(thisToast);
      });
      resolve(finalToasts);
    });
  })
    .catch((err) => reject(err));
});

const getSingleBirthdayWithGuestOfHonorByGuestOfHonorUid = (guestOfHonorUid) => new Promise((resolve, reject) => {
  birthdayData.getBirthdaybyGuestOfHonorUid(guestOfHonorUid)
    .then((birthdays) => {
      const birthday = birthdays[0];
      userData.getUsers().then((users) => {
        if (birthday !== undefined) {
          const guestOfHonor = users.find((x) => x.uid === birthday.guestOfHonorUid);
          birthday.guestOfHonor = guestOfHonor.displayName;
          resolve(birthday);
        }
      });
    })
    .catch((err) => reject(err));
});

const deleteBirthdayAndBirthdayInvitationsAndToasts = (birthdayId) => new Promise((resolve, reject) => {
  birthdayData.deleteBirthday(birthdayId).then(() => {
    userContributorData.getUserContributorsByBirthdayId(birthdayId).then((userContributors) => {
      toastData.getToastsByBirthdayId(birthdayId).then((toasts) => {
        userContributors.forEach((userContributor) => {
          userContributorData.deleteUserContributor(userContributor.id);
        });
        toasts.forEach((toast) => {
          toastData.deleteToast(toast.id);
        });
        resolve();
      });
    });
  })
    .catch((err) => reject(err));
});

export default {
  getBirthdaysWithGuestsOfHonor,
  getInvitedBirthdaysByUserUid,
  getSingleBirthdayWithGuestOfHonorAndInvitations,
  getToastsWithContributorNameByBirthdayId,
  deleteBirthdayAndBirthdayInvitationsAndToasts,
  getSingleBirthdayWithGuestOfHonorByGuestOfHonorUid,
};
