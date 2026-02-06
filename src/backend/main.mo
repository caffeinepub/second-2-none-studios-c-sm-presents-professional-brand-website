import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

// IMPORTANT: Data migration if you modify types or values in stateful variables. Use includes, maps, etc.


actor {
  // ==== Authorization & Store ====
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  var nextBlobId = 0;

  // ==== Data Types ====
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : ?Text;
    hasMembership : Bool;
  };

  public type Appointment = {
    id : Nat;
    name : Text;
    email : Text;
    sessionType : SessionType;
    appointmentTime : Time.Time;
  };

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    inventory : Nat;
    productType : ProductType;
    image : ?Storage.ExternalBlob;
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
    thumbnail : ?Storage.ExternalBlob;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  public type Publication = {
    id : Nat;
    title : Text;
    author : Text;
    summary : Text;
    price : Nat;
    availableQuantity : Nat;
    coverImage : ?Storage.ExternalBlob;
    purchaseLink : ?Text;
    status : PublicationStatus;
    format : PublicationFormat;
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
    productType : ProductType;
    image : ?Storage.ExternalBlob;
    qrCodeImage : ?Text;
    purchaseLink : Text;
  };

  public type SessionType = {
    #mentoring;
    #consultation;
  };

  public type ProductType = {
    #book;
    #apparel;
  };

  public type PaymentStatus = {
    #pending;
    #completed;
    #failed;
  };

  public type PublicationStatus = {
    #forSale;
    #outOfStock;
    #comingSoon;
  };

  public type PublicationFormat = {
    #hardcover;
    #paperback;
    #kindle;
  };

  // ==== Mutable State ====
  let userProfiles = Map.empty<Principal, UserProfile>();
  let appointments = Map.empty<Nat, Appointment>();
  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let videos = Map.empty<Nat, Video>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let pubs = Map.empty<Nat, Publication>();
  let trainingVideos = Map.empty<Nat, TrainingVideo>();
  let checkoutSessions = Map.empty<Text, Principal>();

  var appointmentIdCounter = 1;
  var productIdCounter = 1;
  var orderIdCounter = 1;
  var videoIdCounter = 1;
  var contactIdCounter = 1;
  var stripeConfig : ?Stripe.StripeConfiguration = null;
  var trainingDocumentIdCounter = 2;

  // ==== Helper Functions ====
  func checkMembershipAccess(caller : Principal) : Bool {
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) { profile.hasMembership };
    };
  };

  // ==== Publications Management - Strict 5 Verified Books Only ====
  func getVerifiedPublication(id : Nat) : ?Publication {
    switch (id) {
      case (1) {
        ?{
          id = 1;
          title = "A Precipitating Ideation (sm): Book of Brilliante Poetical and Prophetical Prose, Conceptualizations, Etcetera.";
          author = "Dr. Shane J Charbonnet";
          summary = "A brilliant poetical and prophetical book by Dr. Shane J Charbonnet.";
          price = 4000;
          availableQuantity = 1000;
          coverImage = null;
          purchaseLink = null;
          status = #forSale;
          format = #paperback;
          amazonLink = ?("https://www.amazon.com/dp/B08PBPG2RP");
          description = "Book of brilliante poetical and prophetical prose, conceptualizations, etcetera. Amazon link: https://www.amazon.com/dp/B08PBPG2RP";
        };
      };
      case (2) {
        ?{
          id = 2;
          title = "Rusty Streetcar (c)(sm): Navigating the Big Easy (80s) – Becoming the Design Thinker. Book 1-of-3. Kindle Edition.";
          author = "Dr. Shane J Charbonnet";
          summary = "Journey through the 80s Big Easy, embracing design thinking. Book 1 of 3 series.";
          price = 3500;
          availableQuantity = 100;
          coverImage = null;
          purchaseLink = null;
          status = #forSale;
          format = #kindle;
          amazonLink = ?("https://www.amazon.com/dp/B0DLTFPB82");
          description = "Navigating the Big Easy with a focus on becoming a design thinker. Kindle Edition available on Amazon. Direct link: https://www.amazon.com/dp/B0DLTFPB82";
        };
      };
      case (3) {
        ?{
          id = 3;
          title = "Master Sanjhi's DOJO (c)(sm):: -of- Empathy & Innovation.";
          author = "Dr. Shane J Charbonnet";
          summary = "Book dedicated to empathy and innovation practices, methodologies and virtuous living.";
          price = 2900;
          availableQuantity = 400;
          coverImage = null;
          purchaseLink = null;
          status = #forSale;
          format = #paperback;
          amazonLink = ?("https://www.amazon.com/dp/B0DKC5312Q");
          description = "Book focused on empathy, innovation and critical reasoned practice. Amazon link: https://www.amazon.com/dp/B0DKC5312Q";
        };
      };
      case (4) {
        ?{
          id = 4;
          title = "Clear Eyes: Looking into the Rudiments of Critical Thinking:: Workshop Evaluating the Vital Agent Which Fuses Innovation with Practical Application.";
          author = "Dr. Shane J Charbonnet";
          summary = "A comprehensive workshop evaluating critical thinking and innovation fusion.";
          price = 3200;
          availableQuantity = 500;
          coverImage = null;
          purchaseLink = null;
          status = #forSale;
          format = #paperback;
          amazonLink = ?("https://www.amazon.com/dp/B08MWYV5H6");
          description = "Workshop guide on evaluating the vital agent fusing innovation with practical application. Amazon link: https://www.amazon.com/dp/B08MWYV5H6";
        };
      };
      case (5) {
        ?{
          id = 5;
          title = "'1' Measley Card (C)(sm): Diffusing (adversarial) Energy Forces.";
          author = "Dr. Shane J Charbonnet";
          summary = "Concise work from Dr. Shane J. Charbonnet.";
          price = 1000;
          availableQuantity = 50;
          coverImage = null;
          purchaseLink = null;
          status = #forSale;
          format = #paperback;
          amazonLink = ?("https://www.amazon.com/dp/B0DXBYW41D");
          description = "Small format paperback by Dr. Charbonnet, available on Amazon: https://www.amazon.com/dp/B0DXBYW41D";
        };
      };
      case (_) { null };
    };
  };

  public query func getPublications() : async [Publication] {
    [getVerifiedPublication(1), getVerifiedPublication(2), getVerifiedPublication(3), getVerifiedPublication(4), getVerifiedPublication(5)].filterMap(
      func(p) { p }
    );
  };

  public query func getPublication(id : Nat) : async Publication {
    switch (getVerifiedPublication(id)) {
      case (null) { Runtime.trap("No publication found for the given id: " # id.toText()) };
      case (?publication) { publication };
    };
  };

  public shared ({ caller }) func addPublication(_publication : Publication) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add publications");
    };
    Runtime.trap("Cannot add new publications. Editing is strictly admin-only.");
  };

  public shared ({ caller }) func updatePublication(_id : Nat, _publication : Publication) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update publications");
    };
    Runtime.trap("Cannot update verified publications. Editing is strictly admin-only.");
  };

  public shared ({ caller }) func deletePublication(_id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete publications");
    };
    Runtime.trap("Cannot delete verified publications. Deletion is strictly admin-only.");
  };

  // ==== Training Videos ====
  func getVerifiedTrainingVideo(id : Nat) : ?TrainingVideo {
    switch (id) {
      case (1) {
        ?{
          id = 1;
          title = "Hello, I am Shane J Charbonnet, Ph.D. (better known as; dba) Dr. Shane JC.";
          videoUrl = "https://youtu.be/BFfZPsIE2MA?si=qHl781sVypIHZiIM";
          shortDescription = "Introduction video by Dr. Shane J Charbonnet.";
        };
      };
      case (2) {
        ?{
          id = 2;
          title = "Tempered While ((mastering)) Your Temperament — Part 1-of-2.";
          videoUrl = "https://youtu.be/En_HeXkz_eo?si=Gx7JcXbRXs3z7NGN";
          shortDescription = "An in-depth reflection on mastering emotional balance through disciplined temperament, presented by Dr. Shane J Charbonnet.";
        };
      };
      case (3) {
        ?{
          id = 3;
          title = "Tempered While ((mastering)) Your Temperament — Part 2‑of‑2.";
          videoUrl = "https://www.youtube.com/watch?v=V79TwLKvMAE";
          shortDescription = "Continuation of the Tempered While mastering Your Temperament series. Further insights and practical approaches for emotional mastery.";
        };
      };
      case (4) {
        ?{
          id = 4;
          title = "The Integrity of Your Framework (substance) Vetted Via Your Active Presence.";
          videoUrl = "https://youtu.be/ewGaYAenQpQ?si=0iVJ2kybsdUy-OWD";
          shortDescription = "An exploration of maintaining authentic presence and framework integrity in professional and personal contexts, presented by Dr. Shane J Charbonnet.";
        };
      };
      case (_) { null };
    };
  };

  public query func getTrainingVideos() : async [TrainingVideo] {
    [
      getVerifiedTrainingVideo(1),
      getVerifiedTrainingVideo(2),
      getVerifiedTrainingVideo(3),
      getVerifiedTrainingVideo(4),
    ].filterMap(func(v) { v });
  };

  public query func getTrainingVideo(id : Nat) : async TrainingVideo {
    switch (getVerifiedTrainingVideo(id)) {
      case (null) { Runtime.trap("No training video found for the given id: " # id.toText()) };
      case (?video) { video };
    };
  };

  // ==== Training Documents - Exposed Section ====
  func getVerifiedTrainingDocument(id : Nat) : ?TrainingDocument {
    switch (id) {
      case (1) {
        ?{
          id = 1;
          title = "Releasing Past Disappointments: A Human-centric Path (towards) Empowerment.";
          documentUrl = "Course 1 -- Releasing-past-disappointments-a-human-centric-path-to-empowerment-Jan 19, 2026.pdf";
          shortDescription = "Empowerment guide for releasing past disappointments.";
        };
      };
      case (2) {
        ?{
          id = 2;
          title = "Distinction Codex: Unveiling the Markers of Authentic Mastery.";
          documentUrl = "Distinction Codex: Unveiling the Markers of Authentic Mastery.pdf";
          shortDescription = "Comprehensive guide for identifying authentic mastery in various disciplines. Covers key markers, strategies, and best practices for achieving distinction and excellence.";
        };
      };
      case (3) {
        ?{
          id = 3;
          title = "Transforming Adversity into Lasting Professional and Personal Maturity.";
          documentUrl = "Transforming Adversity into Lasting Professional and Personal Maturity.pdf";
          shortDescription = "The attached PDF file (11,939 KB)";
        };
      };
      case (_) { null };
    };
  };

  public query func getTrainingDocuments() : async [TrainingDocument] {
    [
      getVerifiedTrainingDocument(1),
      getVerifiedTrainingDocument(2),
      getVerifiedTrainingDocument(3),
    ].filterMap(func(d) { d });
  };

  public query func getTrainingDocument(id : Nat) : async TrainingDocument {
    switch (getVerifiedTrainingDocument(id)) {
      case (null) { Runtime.trap("Training document not found for this id: " # id.toText()) };
      case (?document) { document };
    };
  };

  // ==== Apparel Store (Members Only Access) with Updated Structure ====
  func getVerifiedApparelItem(id : Nat) : ?ApparelItem {
    switch (id) {
      case (1) {
        ?{
          id = 1;
          name = "As Strong as Our Weak Link — t-shirt";
          description = "High-quality t-shirt featuring the motto 'As Strong as Our Weak Link'. Order through Bonfire for premium print and shipping services.";
          price = 2000;
          inventory = 100;
          productType = #apparel;
          image = null;
          qrCodeImage = ?("qr code-2_01.27.26.jpg");
          purchaseLink = "https://www.bonfire.com/as-strong-as-our-weak-link/?utm_source=copy_link&utm_medium=campaign_page&utm_campaign=as-strong-as-our-weak-link&utm_content=default";
        };
      };
      case (2) {
        ?{
          id = 2;
          name = "The Potency of Us.";
          description = "Unique apparel item featuring 'The Potency of Us.' line. Includes QR scan code for easy ordering.";
          price = 2500;
          inventory = 100;
          productType = #apparel;
          image = null;
          qrCodeImage = ?"The Potency of Us_.png";
          purchaseLink = "https://www.bonfire.com/the-potency-of-us/?utm_source=copy_link&utm_medium=campaign_page&utm_campaign=the-potency-of-us&utm_content=default";
        };
      };
      case (3) {
        ?{
          id = 3;
          name = "Resonating Within (c)(sm)";
          description = "Exclusive apparel item featuring 'Resonating Within (c)(sm)' design. Includes unique QR scan code for seamless ordering and premium print quality through Bonfire.";
          price = 2600;
          inventory = 120;
          productType = #apparel;
          image = null;
          qrCodeImage = ?("qr code‑3_01.31.26.jpg");
          purchaseLink = "https://www.bonfire.com/resonating-within-csm/?utm_source=copy_link&utm_medium=campaign_page&utm_campaign=resonating-within-csm&utm_content=default";
        };
      };
      case (_) { null };
    };
  };

  public query func getAllApparel() : async [ApparelItem] {
    [getVerifiedApparelItem(1), getVerifiedApparelItem(2), getVerifiedApparelItem(3)].filterMap(func(p) { p });
  };

  // ==== Credentials Section ====
  func getVerifiedCredentials() : Credentials {
    {
      phdDiplomaImage = "fit_01.24.26.png";
      mastersDiplomaImage = "dbu_01.24.26.jpg";
      portraitImage = "sjc_1.13.26b.jpg";
    };
  };

  public query func getCredentials() : async Credentials {
    getVerifiedCredentials();
  };

  // ==== User Profile Management ====
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ==== Stripe Integration ====
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update Stripe configuration");
    };
    stripeConfig := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can create checkout sessions");
    };
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ==== Contact ====
  public query func getContactInfo() : async {
    phone : Text;
    email : Text;
    location : Text;
  } {
    {
      phone = "682-233-3894";
      email = "drshanecharbo@gmail.com";
      location = "Cedar Hill, TX";
    };
  };

  // Public contact form - accessible to all users including guests
  public shared func submitContactForm(name : Text, email : Text, message : Text) : async Nat {
    let id = contactIdCounter;
    let submission : ContactSubmission = {
      id = id;
      name = name;
      email = email;
      message = message;
      submittedAt = Time.now();
    };
    contactSubmissions.add(id, submission);
    contactIdCounter += 1;
    id;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };

  // ==== Biography Content ====
  public query func getBiographyContent() : async {
    headline : Text;
    education : Text;
    philosophy : Text;
    expertise : Text;
  } {
    {
      headline = "Dr. Shane J Charbonnet - Innovator, Educator, Author";
      education = "PhD from Florida Tech";
      philosophy = "Passionate about critical reasoning, problem solving, and design thinking. Committed to fostering intellectual growth and creativity.";
      expertise = "Expertise in mentoring, consulting, and thought leadership in various disciplines.";
    };
  };

  // ==== Membership System ====
  public query func getMembershipPlans() : async [Stripe.ShoppingItem] {
    [
      {
        currency = "usd";
        productName = "Monthly Membership";
        productDescription = "Access to exclusive content and features";
        priceInCents = 5500;
        quantity = 1;
      },
      {
        currency = "usd";
        productName = "Yearly Membership";
        productDescription = "Access to exclusive content and features for a year";
        priceInCents = 51500;
        quantity = 1;
      },
    ];
  };

  public shared ({ caller }) func purchaseMembership(plan : Stripe.ShoppingItem, successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can purchase memberships. Please create an account first.");
    };

    switch (userProfiles.get(caller)) {
      case (null) {
        Runtime.trap("User profile not found. Please complete your profile before purchasing membership.");
      };
      case (?_profile) {
        let sessionUrl = await Stripe.createCheckoutSession(getStripeConfig(), caller, [plan], successUrl, cancelUrl, transform);
        sessionUrl;
      };
    };
  };

  public shared ({ caller }) func activateMembership(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can activate memberships");
    };

    switch (userProfiles.get(user)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        userProfiles.add(user, { profile with hasMembership = true });
      };
    };
  };

  public shared ({ caller }) func deactivateMembership(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can deactivate memberships");
    };

    switch (userProfiles.get(user)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        userProfiles.add(user, { profile with hasMembership = false });
      };
    };
  };

  public query ({ caller }) func isUserMember() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return false;
    };
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) { profile.hasMembership };
    };
  };

  // ==== Access Control Checks ====
  public query ({ caller }) func checkVideoAccess() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return false;
    };
    checkMembershipAccess(caller);
  };

  public query ({ caller }) func checkStoreAccess() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return false;
    };
    checkMembershipAccess(caller);
  };

  public query ({ caller }) func checkBookingAccess() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return false;
    };
    checkMembershipAccess(caller);
  };

  // ==== Appointment Booking (Members Only) ====
  public shared ({ caller }) func bookAppointment(name : Text, email : Text, sessionType : SessionType, appointmentTime : Time.Time) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can book appointments");
    };
    if (not checkMembershipAccess(caller)) {
      Runtime.trap("Unauthorized: Only members can book appointments");
    };

    let id = appointmentIdCounter;
    let appointment : Appointment = {
      id = id;
      name = name;
      email = email;
      sessionType = sessionType;
      appointmentTime = appointmentTime;
    };
    appointments.add(id, appointment);
    appointmentIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAppointments() : async [Appointment] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };
    appointments.values().toArray();
  };

  // ==== Store Products (Members Only Access) ====
  public query ({ caller }) func getProducts() : async [Product] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view products");
    };
    if (not checkMembershipAccess(caller)) {
      Runtime.trap("Unauthorized: Only members can view products");
    };
    products.values().toArray();
  };

  public shared ({ caller }) func addProduct(product : Product) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let id = productIdCounter;
    products.add(id, { product with id = id });
    productIdCounter += 1;
    id;
  };

  public shared ({ caller }) func createOrder(customerName : Text, customerEmail : Text, productIds : [Nat], totalPrice : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can create orders");
    };
    if (not checkMembershipAccess(caller)) {
      Runtime.trap("Unauthorized: Only members can create orders");
    };

    let id = orderIdCounter;
    let order : Order = {
      id = id;
      customerName = customerName;
      customerEmail = customerEmail;
      productIds = productIds;
      totalPrice = totalPrice;
      paymentStatus = #pending;
      paymentSessionId = null;
    };
    orders.add(id, order);
    orderIdCounter += 1;
    id;
  };

  // ==== Videos (Members Only Access) ====
  public query ({ caller }) func getVideos() : async [Video] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can view videos");
    };
    if (not checkMembershipAccess(caller)) {
      Runtime.trap("Unauthorized: Only members can view videos");
    };
    videos.values().toArray();
  };

  public shared ({ caller }) func addVideo(video : Video) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add videos");
    };
    let id = videoIdCounter;
    videos.add(id, { video with id = id });
    videoIdCounter += 1;
    id;
  };

  public query func getDistinguishedServiceProfiles() : async [UserProfile] {
    Runtime.trap("No distinguished service profiles available");
  };
};
