import User from '@/models/User'
import Category from '@/models/Category'
import Restriction from '@/models/Restriction'
import Event from '@/models/Event'

export const ensureModelsAreLoaded = () => {
  if (
    User.modelName &&
    Category.modelName &&
    Restriction.modelName &&
    Event.modelName
  ) {
    console.log('Todos los modelos están cargados.')
  }
}
