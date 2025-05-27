import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import gigsJson from '../data/Gigs.json';

export const gigService = {
    query,
    save,
    remove,
    getById,
    createGig,
    getDefaultFilter
}

const STORAGE_KEY = 'gigs'

_createGigs()

async function query() {
    let gigs = await storageService.query(STORAGE_KEY)
    // if (filterBy) {
    //     let { minBatteryStatus, model = '', type = '' } = filterBy
    //     minBatteryStatus = minBatteryStatus || 0
    //     const regexModelTerm = new RegExp(model, 'i')
    //     gigs = gigs.filter(gig =>
    //         regexModelTerm.test(gig.model) &&
    //         gig.batteryStatus > minBatteryStatus &&
    //         (!type || type === gig.type)
    //     )
    // }
    return gigs
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(gigToSave) {
    if (gigToSave.id) {
        return storageService.put(STORAGE_KEY, gigToSave)
    } else {
        gigToSave.isOn = false
        return storageService.post(STORAGE_KEY, gigToSave)
    }
    

}

function createGig(title = '', price = '', owner = {}, daysToMake = '', description = '', imgUrl = '',
    tags = [], likedByUsers = []) {
    return {
        title, price, owner, daysToMake, description, imgUrl,
        tags, likedByUsers
    }
}

function getDefaultFilter() {
    return {
        tags: []
    }
}

function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        utilService.saveToStorage(STORAGE_KEY, gigsJson)
    }
}