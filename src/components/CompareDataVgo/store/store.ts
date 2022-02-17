import { makeAutoObservable, flow, runInAction } from "mobx"
import { myAxios } from "../../../dal/api"
import { validateClient, validateTasks, validateFiles } from "./validate"

class StoreVGO {
    constructor() {
        makeAutoObservable(this)
    }
    listClients: {
        gid: number,
        title: string,
        idSp: number
    }[] = []
    listMPV: {
        id: number,
        title: string
    }[] = []
    listServices: {
        id: number,
        title: string
    }[] = []

    manager: {
        mailManager: string[],
        copyMailManager: string[]
    } = {
            mailManager: [],
            copyMailManager: []
        }

    menuState: number = 0

    newTasks: {
        textTask: string,
        manager: string,
        copyManager: string
    }[] = []

    fileList: any[] = []

    daysAtWork = 1

    client = {
        daysAtWork: this.daysAtWork,
        client: ''
    }

    isValidClient = false
    setValidClient = () => {
        validateClient(this.client, (val: boolean) => runInAction(() => this.isValidClient = val))
    }
    isValidTasks = false
    setValidTasks = () => {
        validateTasks(this.newTasks, (val: boolean) => runInAction(() => this.isValidTasks = val))
    }
    isValidFiles = false
    setValidFiles = () => {
        validateFiles(this.fileList, (val: boolean) => runInAction(() => this.isValidFiles = val))
    }
    get isValid() {
        return this.isValidClient && this.isValidTasks && this.isValidFiles
    }

    isLoad = false
    resetData = () => {
        this.client = {
            daysAtWork: this.daysAtWork,
            client: ''
        }
        this.fileList = []
        this.newTasks = []
        this.listServices = []
        this.manager = {
            mailManager: [],
            copyMailManager: []
        }
    }

    removeFileListByIndex = (index: number) => {
        this.fileList = this.fileList.filter((item, indexf) => index != indexf)
    }
    setFileList = (newFileList: any[]) => {
        this.fileList = [...newFileList, ...this.fileList]
    }

    addNewTask = (value: any) => {
        const cloneValue = { ...value }
        this.newTasks = [cloneValue, ...this.newTasks]
    }
    deleteNewTask = (index: number) => {
        this.newTasks = this.newTasks.filter((item, indexF) => index != indexF)
    }
    sendData = flow(function* (this: StoreVGO, hello: any = 1) {
        try {
            this.isLoad = true
            var formData = new FormData()
            formData.append('sendData', 'sendData');
            formData.append('client', JSON.stringify(this.client));
            formData.append('newTasks', JSON.stringify(this.newTasks));
            this.fileList.forEach(item =>
                formData.append('fileList[]', item)
            )

            const data = yield myAxios(formData)

            const url = this.getUrl(data)
            //@ts-ignore
            document.location = url
            this.resetData()
            this.isLoad = false
        } catch (err: any) {
            this.isLoad = false
            console.log('sendData', err.response)
        }
    })

    getUrl = (urlData: { url: string, content: string, author: string }) => {
        let limitToWork: any = this.client.daysAtWork
        let url = urlData.url
        let content = urlData.content
        let sendTo: any = this.newTasks.map(item => item.manager)
        sendTo = new Set(sendTo)
        sendTo = [...sendTo]
        sendTo = '&SendTo=' + sendTo.join(';')
        let sendCopyArray: any = this.newTasks.map(item => item.copyManager)

        sendCopyArray = [urlData.author, ...sendCopyArray]
        sendCopyArray = new Set(sendCopyArray)
        sendCopyArray = [...sendCopyArray]

        let sendCopy = '&SendCopy=' + sendCopyArray.join(';')
        //@ts-ignore
        let parent = `&Parent=${this.client.client.gid}_${this.client.client.title}`
        let d = new Date();
        switch (d.getDay()) {
            case 4:
                if (this.daysAtWork == 2) {
                    limitToWork += 2
                }
                break
            case 5:
                limitToWork += 2
                break
            case 6:
                limitToWork += 2
                break
            case 7:
                limitToWork += 1
                break
        }
        limitToWork = `&Length=${limitToWork}`
        limitToWork = encodeURI(limitToWork)
        url = encodeURI(url)
        content = encodeURI(content)
        sendTo = encodeURI(sendTo)
        sendCopy = encodeURI(sendCopy)
        parent = encodeURI(parent)
        return `${url}${sendTo}${limitToWork}${sendCopy}${content}${parent}`
    }


    getManager = flow(function* (this: StoreVGO, idMVP, idService) {
        if (idMVP && idService) {
            try {
                this.manager = yield myAxios({
                    getManager: 'getManager',
                    idMVP,
                    idService
                })
            } catch (err: any) {
                console.log('getManager', err.response)
            }
            return
        }
        this.manager = {
            mailManager: [],
            copyMailManager: []
        }
    })

    getlistClient = flow(function* (this: StoreVGO) {
        try {
            this.listClients = yield myAxios({
                getListClients: 'getListClients'
            })
        } catch (err: any) {
            console.log('getListClients', err.response);
        }
    })

    getDataStart = flow(function* (this: StoreVGO) {
        this.getlistClient()
        try {
            this.listMPV = yield myAxios({
                getListMVP: 'getListMVP'
            })
        } catch (err: any) {
            console.log('getListMVP', err.response);
        }
    })
    getListServices = flow(function* (this: StoreVGO, MVP) {
        try {
            this.listServices = yield myAxios({
                getListServices: 'getListServices',
                MVP,
            })
        } catch (err: any) {
            console.log('getListServices', err.response);
        }
    })

    //for ListTasks

    selectedTask = []
    selectedFiles = []
    allTasksClient = []
    urlSp = ''

    getUrlSp = flow(function* (this: StoreVGO, gid: number) {
        try {
            this.urlSp = yield myAxios({
                getUrlSp: 'getUrlSp',
                gid
            })
        } catch (err: any) {
            console.log('getUrlSp', err.response)
        }
    })

    getAllTasksClient = flow(function* (this: StoreVGO, gid: number) {
        try {
            this.allTasksClient = yield myAxios({
                getAllTasksClient: 'getAllTasksClient',
                gid
            })
        } catch (err: any) {
            console.log('getAllTasksClient', err.response)
        }
    })
    getFilesTask = flow(function* (this: StoreVGO, gid: number, idTask: number) {
        try {
            this.selectedFiles = yield myAxios({
                getFilesTask: 'getFilesTask',
                gid,
                idTask
            })
        } catch (err: any) {
            console.log('getFilesTask', err.response)
        }
    })
    getSelectedTask = flow(function* (this: StoreVGO, gid: number, idTask: number) {
        try {
            this.selectedTask = yield myAxios({
                getSelectedTask: 'getSelectedTask',
                gid,
                idTask
            })
        } catch (err: any) {
            console.log('getSelectedTask', err.response)
        }
    })
}

export const storeVGO = new StoreVGO
