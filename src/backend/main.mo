import Int "mo:core/Int";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";

actor {
  let appointmentList = List.empty<Appointment>();

  type Appointment = {
    patientName : Text;
    phoneNumber : Text;
    preferredDate : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Appointment {
    public func compare(a1 : Appointment, a2 : Appointment) : Order.Order {
      Int.compare(a2.timestamp, a1.timestamp);
    };
  };

  public shared ({ caller }) func submitAppointment(
    patientName : Text,
    phoneNumber : Text,
    preferredDate : Text,
    message : Text,
  ) : async () {
    let appointment : Appointment = {
      patientName;
      phoneNumber;
      preferredDate;
      message;
      timestamp = Time.now();
    };
    appointmentList.add(appointment);
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointmentList.toArray().sort();
  };
};
