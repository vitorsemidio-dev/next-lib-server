export default interface INameAvailabilityRepository {
	checkNameAvailability(name: string): Promise<boolean>;
}
