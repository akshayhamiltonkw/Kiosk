exports.QueueStatus = {
  Queued: 0,
  ReQueued: 1,
  Seated: 2,
  Closed: 3,
  Canceled: 4,
  Rest_Canceled: 5,
  Rest_ReQueued: 6,
  Rest_Queued: 7,
  RestHold: 8,
  Hold: 9,
};

exports.CancelReason = {
  None: 0,
  No_show: 1,
  No_answer: 2,
  Customer_canceled: 3,
  Went_to_other_restaurant: 4,
  Restaurant_closed: 5,
  Waiting_for_long_time: 6,
  Weather: 7,
  Other: 8,
  Auto_Cancel: 9,
  I_am_too_fare: 10,
  My_host_asked_me_To_cancel: 11,
  changed_my_maind: 12,
};
