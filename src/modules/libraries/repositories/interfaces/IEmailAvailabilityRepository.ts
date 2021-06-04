export default interface IEmailAvailabilityRepository {
	checkEmailAvailability(email: string): Promise<boolean>;
}
