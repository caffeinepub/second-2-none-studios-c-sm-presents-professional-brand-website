import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Stripe "stripe/stripe";
import Time "mo:core/Time";

module {
  public type Publication = {
    id : Nat;
    title : Text;
    author : Text;
    summary : Text;
    price : Nat;
    availableQuantity : Nat;
    coverImage : ?Blob;
    purchaseLink : ?Text;
    status : { #forSale; #outOfStock; #comingSoon };
    format : { #hardcover; #paperback; #kindle };
    amazonLink : ?Text;
    description : Text;
  };

  public type TrainingVideo = {
    id : Nat;
    title : Text;
    videoUrl : Text;
    shortDescription : Text;
  };

  public type TrainingDocument = {
    id : Nat;
    title : Text;
    documentUrl : Text;
    shortDescription : Text;
  };

  public type Credentials = {
    phdDiplomaImage : Text;
    mastersDiplomaImage : Text;
    portraitImage : Text;
  };

  public type ApparelItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    inventory : Nat;
    productType : { #book; #apparel };
    image : ?Blob;
    qrCodeImage : ?Text;
    purchaseLink : Text;
  };

  public type PaymentStatus = { #pending; #completed; #failed };
  public type SessionType = { #mentoring; #consultation };

  public type Appointment = {
    id : Nat;
    name : Text;
    email : Text;
    sessionType : SessionType;
    appointmentTime : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : ?Text;
    hasMembership : Bool;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    inventory : Nat;
    productType : { #book; #apparel };
    image : ?Blob;
    qrCodeImage : ?Text;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    customerEmail : Text;
    productIds : [Nat];
    totalPrice : Nat;
    paymentStatus : PaymentStatus;
    paymentSessionId : ?Text;
  };

  public type Video = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    videoUrl : Text;
    thumbnail : ?Blob;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    appointments : Map.Map<Nat, Appointment>;
    products : Map.Map<Nat, Product>;
    orders : Map.Map<Nat, Order>;
    videos : Map.Map<Nat, Video>;
    contactSubmissions : Map.Map<Nat, ContactSubmission>;
    pubs : Map.Map<Nat, Publication>;
    trainingVideos : Map.Map<Nat, TrainingVideo>;
    checkoutSessions : Map.Map<Text, Principal>;

    appointmentIdCounter : Nat;
    productIdCounter : Nat;
    orderIdCounter : Nat;
    videoIdCounter : Nat;
    contactIdCounter : Nat;
    stripeConfig : ?Stripe.StripeConfiguration;
    trainingDocumentIdCounter : Nat;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    old;
  };
};
