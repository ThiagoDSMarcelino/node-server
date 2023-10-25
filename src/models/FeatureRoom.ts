import Feature from './Feature';
import Room from './Room';

interface FeatureRoom {
	id: number;
	feature: Feature;
	featureId: number;
	room: Room;
	roomId: number;
}

export default FeatureRoom;
