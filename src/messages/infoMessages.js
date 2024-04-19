export const InfoMessage = {
   
    userWalletFoundInfo: (usbAddress, amount, currency) =>
      `
        <p style="font-size: 14px; padding-left: 16px; padding-right: 16px; text-align: left;">You are about to purchase USB Coin to the following address:
        <b style="font-size: 18px;">${usbAddress}</b>, with the amount of <b style="font-size: 18px;">${amount} ${currency}</b>
        Please ensure that this is the correct information before proceeding.</p>
      `,
    UserWalletNotFoundInfotMessage: (usbAddress, amount, currency) =>
      `
        <p style="font-size: 14px; padding-left: 16px; padding-right: 16px; text-align: left;">
        The provided wallet address is not registered in our records. We suggest you create a wallet on the USB app before proceeding with the deposit. In case you haven't created a wallet yet, please do so on the USB app. Otherwise, your tokens will be sent to the address you provided, which is not in our records.
        </p>
        <p style="font-size: 14px; padding-left: 16px; padding-right: 16px; text-align: left;">
          If you still wish to continue, here is the information you requested: You want to purchase USB tokens to the address <b style="font-size: 18px;">${usbAddress}</b> with an amount of <b style="font-size: 18px;">${amount} ${currency}</b>. Ensure that this address belongs to you and is the intended recipient before proceeding with the transaction.
        </p>
        `
  }