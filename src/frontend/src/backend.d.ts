import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    id: bigint;
    title: string;
    thumbnail?: ExternalBlob;
    description: string;
    category: string;
    videoUrl: string;
}
export interface Product {
    id: bigint;
    inventory: bigint;
    name: string;
    description: string;
    productType: ProductType;
    qrCodeImage?: string;
    image?: ExternalBlob;
    price: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface ContactSubmission {
    id: bigint;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
}
export interface Credentials {
    mastersDiplomaImage: string;
    phdDiplomaImage: string;
    portraitImage: string;
}
export interface ApparelItem {
    id: bigint;
    purchaseLink: string;
    inventory: bigint;
    name: string;
    description: string;
    productType: ProductType;
    qrCodeImage?: string;
    image?: ExternalBlob;
    price: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface TrainingVideo {
    id: bigint;
    title: string;
    shortDescription: string;
    videoUrl: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TrainingDocument {
    id: bigint;
    title: string;
    documentUrl: string;
    shortDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Publication {
    id: bigint;
    status: PublicationStatus;
    title: string;
    amazonLink?: string;
    purchaseLink?: string;
    availableQuantity: bigint;
    description: string;
    author: string;
    coverImage?: ExternalBlob;
    summary: string;
    price: bigint;
    format: PublicationFormat;
}
export interface Appointment {
    id: bigint;
    sessionType: SessionType;
    name: string;
    email: string;
    appointmentTime: Time;
}
export interface UserProfile {
    name: string;
    email: string;
    phone?: string;
    hasMembership: boolean;
}
export enum ProductType {
    book = "book",
    apparel = "apparel"
}
export enum PublicationFormat {
    hardcover = "hardcover",
    paperback = "paperback",
    kindle = "kindle"
}
export enum PublicationStatus {
    outOfStock = "outOfStock",
    comingSoon = "comingSoon",
    forSale = "forSale"
}
export enum SessionType {
    mentoring = "mentoring",
    consultation = "consultation"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    activateMembership(user: Principal): Promise<void>;
    addProduct(product: Product): Promise<bigint>;
    addPublication(_publication: Publication): Promise<void>;
    addVideo(video: Video): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(name: string, email: string, sessionType: SessionType, appointmentTime: Time): Promise<bigint>;
    checkBookingAccess(): Promise<boolean>;
    checkStoreAccess(): Promise<boolean>;
    checkVideoAccess(): Promise<boolean>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(customerName: string, customerEmail: string, productIds: Array<bigint>, totalPrice: bigint): Promise<bigint>;
    deactivateMembership(user: Principal): Promise<void>;
    deletePublication(_id: bigint): Promise<void>;
    getAllApparel(): Promise<Array<ApparelItem>>;
    getAppointments(): Promise<Array<Appointment>>;
    getBiographyContent(): Promise<{
        headline: string;
        education: string;
        expertise: string;
        philosophy: string;
    }>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<{
        email: string;
        phone: string;
        location: string;
    }>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getCredentials(): Promise<Credentials>;
    getDistinguishedServiceProfiles(): Promise<Array<UserProfile>>;
    getMembershipPlans(): Promise<Array<ShoppingItem>>;
    getProducts(): Promise<Array<Product>>;
    getPublication(id: bigint): Promise<Publication>;
    getPublications(): Promise<Array<Publication>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTrainingDocument(id: bigint): Promise<TrainingDocument>;
    getTrainingDocuments(): Promise<Array<TrainingDocument>>;
    getTrainingVideo(id: bigint): Promise<TrainingVideo>;
    getTrainingVideos(): Promise<Array<TrainingVideo>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideos(): Promise<Array<Video>>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    isUserMember(): Promise<boolean>;
    purchaseMembership(plan: ShoppingItem, successUrl: string, cancelUrl: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<bigint>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updatePublication(_id: bigint, _publication: Publication): Promise<void>;
}
