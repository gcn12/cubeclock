import React, { Component } from "react"
import "./Dashboard.css"
import CardList from "./CardList"
import GraphNumberSolves from "./GraphNumberSolves"
import Settings from "../Settings/Settings"
import Graph from "./GraphAverages"
import Donut from "./GraphDonut"
import Summary from "./Summary"

class Dashboard extends Component{

    state = {
        username: "",
        newPassword: "",
        oldPassword: "",
        solves: [],
        solvesSorted: [],
        sessions: 0,
        isAnalytics: true,
        deleteAccountPassword: "",
        isWrongPassword: false,
        isWrongPassword2: false,
        isUsernameChanged: false,
        sessionsDBunique: [],
        datesWeek: [],
        datesMonth: [],
        datesYear: [],
        allDates: [],
        datesDBunique: [],
        averagesWeek: [],
        averagesMonth: [],
        averagesYear: [],
        allDateAverages: [],
        dateAverages: [],
        isSolves: true,
        usernameExists: false,
        categories: [],
        puzzles: [],
        categoryDates: [],
        indexNumberGraphs: "",
        cardSortValue: "",
        interfaceSession: {},
        timePeriod: 0,
        numberSolvesCategory: [], 
        optionSelected: "",
        countNumberSolves: [],
        countNumberSolvesWeek: [],
        countNumberSolvesMonth: [],
        countNumberSolvesYear: [],
        allCounts: [],
        averagesMS: [],
        puzzlesSummary: [],
        newPasswordReenter: "",
        isPasswordMatch: true,
        isPasswordChanged: false,
        solvesSortedCardList: [],
        puzzleWorst: [],
        puzzleBest: [],
    }

    manageSolveData = () => {
        const doAll = async () => {
            await this.getSolves()
            await this.sortSolves()
            await this.sortDates()
            await this.getCategories()
            await this.sortCategories()
            await this.getPuzzles()
            await this.sortPuzzles()
            await this.consolidateAllDatesAndSolves()
            await this.getBestTimes()
        };
        doAll();
    };

    getSolves = () => {
        if (this.props.id){
            this.setState({
                dateAverages: [],
                solves: [],
                solvesSorted: [],
                solvesSortedCardList: [],
                datesDBunique: [],
                categories: [],
                puzzles: [],
                categoryDates: [],
                countNumberSolves: [],
                numberSolvesCategory: [],
                datesWeek: [],
                datesMonth: [],
                datesYear: [],
                allDates: [],
                averagesWeek: [],
                allDateAverages: [],
                averagesMonth: [],
                averagesYear: [],
            })
            const allSessions = []
            const allDates = []
            let datesWeek = []
            let datesMonth = []
            let datesYear = []
            let solvesByUnix = [...this.props.solves].sort(this.compareUnix)
            let threshold = Math.round(Date.now()/1000)
            for (const solve of solvesByUnix) {
                allSessions.push(solve.session)
                if (solve.date){
                    allDates.push(solve.date)
                }
                if (solve.unix > (threshold-604800)){
                    datesWeek.push(solve.date)
                }
                if (solve.unix > (threshold-2592000)){
                    datesMonth.push(solve.date)
                }
                if (solve.unix > (threshold-31536000)){
                    datesYear.push(solve.date)
                }
            }
            datesWeek = [...new Set(datesWeek)]
            datesMonth = [...new Set(datesMonth)]
            datesYear = [...new Set(datesYear)]
            let uniqueSessions = [...new Set(allSessions)]
            let uniqueDates = [...new Set(allDates)]
            this.setState({
                sessionsDBunique: uniqueSessions,
                sessions: uniqueSessions.length, 
                datesDBunique: [uniqueDates, ...this.state.datesDBunique],
                datesWeek: [datesWeek, ...this.state.datesWeek],
                datesMonth: [datesMonth, ...this.state.datesMonth],
                datesYear: [datesYear, ...this.state.datesYear],
            })
        }
    }

    sortSolves = () => {
        //sorts solves by session
        let sessionsDBuniqueInOrder = this.state.sessionsDBunique.sort(this.compare)
        let bestTimes = []
        let worstTimes = []
        for (const session of sessionsDBuniqueInOrder) {
            const solves = []
            const ms = []
            const times = []
            let solvesInOrder = this.props.solves.sort(this.compareUnix)
            for (const solve of solvesInOrder) {
                if (solve.session === session){
                    solves.push(solve)
                    ms.push(Number(solve.milliseconds))
                    times.push(solve.solve)
                }
            }
            this.setState({
                solvesSorted: [solves, ...this.state.solvesSorted],
                solvesSortedCardList: [solves, ...this.state.solvesSorted]
            })
            let lowestMS = Math.min(...ms)
            bestTimes.push(times[ms.indexOf(lowestMS)])
            let highestMS = Math.max(...ms)
            worstTimes.push(times[ms.indexOf(highestMS)])
        }
        bestTimes.reverse()
        worstTimes.reverse()
        this.setState({
            puzzleBest: bestTimes,
            puzzleWorst: worstTimes,
        })
    }

    sortDates = () => {
        //sorts all solves by date
        //also gets number of solves based on date
        const numberSolves = []
        const numberSolvesWeek = []
        const numberSolvesMonth = []
        const numberSolvesYear = []
        const threshold = Math.round(Date.now()/1000)
        for (const date of this.state.datesDBunique[0]) {
            const masterArray = []
            let numberSolvesWeekCount = 0
            let numberSolvesMonthCount = 0
            let numberSolvesYearCount = 0
            for (const solve of this.props.solves) {
                if (solve.date === date){
                    masterArray.push(solve.milliseconds)
                    if (solve.unix > (threshold-604800)){
                        numberSolvesWeekCount++
                    }
                    if (solve.unix > (threshold-2592000)){
                        numberSolvesMonthCount++
                    }
                    if (solve.unix > (threshold-31536000)){
                        numberSolvesYearCount++
                    }
                }
            }
            if (masterArray.length > 0){
                numberSolves.push(masterArray.length)
            }
            if(numberSolvesWeekCount>0){
                numberSolvesWeek.push(numberSolvesWeekCount)
            }
            if(numberSolvesMonthCount>0){
                numberSolvesMonth.push(numberSolvesMonthCount)
            }
            if(numberSolvesYearCount>0){
                numberSolvesYear.push(numberSolvesYearCount)
            }
        }
        this.setState({
            countNumberSolves: [...this.state.countNumberSolves, numberSolves],
            countNumberSolvesWeek: [...this.state.countNumberSolvesWeek, numberSolvesWeek],
            countNumberSolvesMonth: [...this.state.countNumberSolvesMonth, numberSolvesMonth],
            countNumberSolvesYear: [...this.state.countNumberSolvesYear, numberSolvesYear],
        })
        this.dateAverage()
    }

    getCategories = () => {
        //creates array of unique categories
        //then puts them into state
        let categories = []
        for (const solves of this.props.solves) {
            if (solves.sessionname){
                categories=[...categories, solves.sessionname]
            }
        }
        categories = new Set(categories)
        categories = Array.from(categories)
        this.setState({
            categories: categories,
        })
    }

    sortCategories = () => {
        let threshold = Math.round(Date.now()/1000)
        for (const category of this.state.categories) {
            let categoryDates = []
            let categorySolves = []
            let solves = []
            let numberSolves = []
            let categoryDatesWeek = []
            let categorySolvesWeek = []
            let solvesWeek = []
            let numberSolvesWeek = []
            let categoryDatesMonth = []
            let categorySolvesMonth = []
            let solvesMonth = []
            let numberSolvesMonth = []
            let categoryDatesYear = []
            let categorySolvesYear = []
            let solvesYear = []
            let numberSolvesYear = []
            for (const date of this.state.datesDBunique[0]) {
                let totalMS = 0
                let count = 0
                let totalMSWeek = 0
                let countWeek = 0
                let totalMSMonth = 0
                let countMonth = 0
                let totalMSYear = 0
                let countYear = 0
                for (const solve of this.props.solves) {
                    if (solve.date===date && solve.sessionname===category){
                        totalMS += Number(solve.milliseconds)
                        count ++
                        categoryDates.push(date)
                        if (solve.unix > (threshold-604800)){
                            totalMSWeek += Number(solve.milliseconds)
                            countWeek ++
                            categoryDatesWeek.push(date)
                        }
                        if (solve.unix > (threshold-2592000)){
                            totalMSMonth += Number(solve.milliseconds)
                            countMonth ++
                            categoryDatesMonth.push(date)
                        }
                        if (solve.unix > (threshold-31536000)){
                            totalMSYear += Number(solve.milliseconds)
                            countYear ++
                            categoryDatesYear.push(date)
                        }
                    }
                }
                if (count>0){
                    numberSolves.push(count)
                }
                if (countWeek>0){
                    numberSolvesWeek.push(countWeek)
                }
                if (countMonth>0){
                    numberSolvesMonth.push(count)
                }
                if (countYear>0){
                    numberSolvesYear.push(countYear)
                }
                let average = Number((totalMS/count/1000).toFixed(3))
                if(average>0){
                    categorySolves.push(average)
                }
                let averageWeek = Number((totalMSWeek/countWeek/1000).toFixed(3))
                if(averageWeek>0){
                    categorySolvesWeek.push(averageWeek)
                }
                let averageMonth = Number((totalMSMonth/countMonth/1000).toFixed(3))
                if(averageMonth>0){
                    categorySolvesMonth.push(averageMonth)
                }
                let averageYear = Number((totalMSYear/countYear/1000).toFixed(3))
                if(averageYear>0){
                    categorySolvesYear.push(averageYear)
                }
            }
            categoryDates = [...new Set(categoryDates)]
            if(solves.length>0){
                categorySolves = [...categorySolves, solves]
            }
            categoryDatesWeek = [...new Set(categoryDatesWeek)]
            if(solvesWeek.length>0){
                categorySolvesWeek = [...categorySolvesWeek, solvesWeek]
            }
            categoryDatesMonth = [...new Set(categoryDatesMonth)]
            if(solvesMonth.length>0){
                categorySolvesMonth = [...categorySolvesMonth, solvesMonth]
            }
            categoryDatesYear = [...new Set(categoryDatesYear)]
            if(solvesYear.length>0){
                categorySolvesYear = [...categorySolvesYear, solvesYear]
            }
            
            this.setState({
                averagesYear: [...this.state.averagesYear, categorySolvesYear],
                datesYear: [...this.state.datesYear, categoryDatesYear],
                averagesMonth: [...this.state.averagesMonth, categorySolvesMonth],
                datesMonth: [...this.state.datesMonth, categoryDatesMonth],
                averagesWeek: [...this.state.averagesWeek, categorySolvesWeek],
                datesWeek: [...this.state.datesWeek, categoryDatesWeek],
                dateAverages: [...this.state.dateAverages, categorySolves],
                datesDBunique: [...this.state.datesDBunique, categoryDates],
                countNumberSolves: [...this.state.countNumberSolves, numberSolves],
                countNumberSolvesWeek: [...this.state.countNumberSolvesWeek, numberSolvesWeek],
                countNumberSolvesMonth: [...this.state.countNumberSolvesMonth, numberSolvesMonth],
                countNumberSolvesYear: [...this.state.countNumberSolvesYear, numberSolvesYear],
            })
        }
    }

    

    getPuzzles = () => {
        let allPuzzles = []
        let puzzles = []
        let puzzlesWeek = []
        let puzzlesMonth = []
        let puzzlesYear = []
        let threshold = Math.round(Date.now()/1000)
        for (const solves of this.props.solves){
            if (solves.date){
                puzzles = [...puzzles, solves.puzzle]
            }
            if (solves.unix > (threshold-604800)){
                puzzlesWeek = [...puzzlesWeek, solves.puzzle]
            }
            if (solves.unix > (threshold-2592000)){
                puzzlesMonth = [...puzzlesMonth, solves.puzzle]
            }
            if (solves.unix > (threshold-31536000)){
                puzzlesYear = [...puzzlesYear, solves.puzzle]
            }
        }
        puzzles = [...new Set(puzzles)]
        puzzlesWeek = [...new Set(puzzlesWeek)]
        puzzlesMonth = [...new Set(puzzlesMonth)]
        puzzlesYear = [...new Set(puzzlesYear)]
        allPuzzles = [puzzles, puzzlesWeek, puzzlesMonth, puzzlesYear]
        this.setState({
            puzzles: allPuzzles,
            puzzlesSummary: puzzles,
        })
        for (const puzzle of puzzles) {
            this.setState({
                categories: [...this.state.categories, puzzle],
            })
        }
    }

    sortPuzzles = () => {
        let numberSolvesCategoryAllTime = []
        let numberSolvesCategoryWeek = []
        let numberSolvesCategoryMonth = []
        let numberSolvesCategoryYear = []
        let threshold = Math.round(Date.now()/1000)
        for (const puzzle of this.state.puzzles[0]){
            let puzzleSolves = []
            let puzzleDates = []
            let numberSolves = []
            let puzzleSolvesWeek = []
            let puzzleDatesWeek = []
            let numberSolvesWeek = []
            let puzzleSolvesMonth = []
            let puzzleDatesMonth = []
            let numberSolvesMonth = []
            let puzzleSolvesYear = []
            let puzzleDatesYear = []
            let numberSolvesYear = []
            let countNumberSolvesCategory = 0
            let countNumberSolvesCategoryWeek = 0
            let countNumberSolvesCategoryMonth = 0
            let countNumberSolvesCategoryYear = 0
            for (const date of this.state.datesDBunique[0]){
                let totalMS = 0
                let count = 0
                let totalMSWeek = 0
                let countWeek = 0
                let totalMSMonth = 0
                let countMonth = 0
                let totalMSYear = 0
                let countYear = 0
                for (const solve of this.props.solves){
                    if (solve.date===date && solve.puzzle===puzzle){
                        totalMS += Number(solve.milliseconds)
                        count ++
                        puzzleDates.push(date)
                        if (puzzle !== null){
                            countNumberSolvesCategory++
                        }
                        if (solve.unix > (threshold-604800)){
                            totalMSWeek += Number(solve.milliseconds)
                            countWeek ++
                            puzzleDatesWeek.push(date)
                            if (puzzle !== null){
                                countNumberSolvesCategoryWeek++
                            }
                        }
                        if (solve.unix > (threshold-2592000)){
                            totalMSMonth += Number(solve.milliseconds)
                            countMonth ++
                            puzzleDatesMonth.push(date)
                            if (puzzle !== null){
                                countNumberSolvesCategoryMonth++
                            }
                        }
                        if (solve.unix > (threshold-31536000)){
                            totalMSYear += Number(solve.milliseconds)
                            countYear ++
                            puzzleDatesYear.push(date)
                            if (puzzle !== null){
                                countNumberSolvesCategoryYear++
                            }
                        }
                    }
                }
                let average = Number((totalMS/count/1000).toFixed(3))
                if(average>0){
                    puzzleSolves.push(average)
                }
                if(count>0){
                    numberSolves.push(count)
                }
                let averageWeek = Number((totalMSWeek/countWeek/1000).toFixed(3))
                if(averageWeek>0){
                    puzzleSolvesWeek.push(averageWeek)
                }
                if(countWeek>0){
                    numberSolvesWeek.push(countWeek)
                }
                let averageMonth = Number((totalMSMonth/countMonth/1000).toFixed(3))
                if(averageMonth>0){
                    puzzleSolvesMonth.push(averageMonth)
                }
                if(countMonth>0){
                    numberSolvesMonth.push(countMonth)
                }
                let averageYear = Number((totalMSYear/countYear/1000).toFixed(3))
                if(averageYear>0){
                    puzzleSolvesYear.push(averageYear)
                }
                if(countYear>0){
                    numberSolvesYear.push(countYear)
                }
            }
            numberSolvesCategoryAllTime.push(countNumberSolvesCategory)
            puzzleDates = [...new Set(puzzleDates)]
            numberSolvesCategoryWeek.push(countNumberSolvesCategoryWeek)
            puzzleDatesWeek = [...new Set(puzzleDatesWeek)]
            numberSolvesCategoryMonth.push(countNumberSolvesCategoryMonth)
            puzzleDatesMonth = [...new Set(puzzleDatesMonth)]
            numberSolvesCategoryYear.push(countNumberSolvesCategoryYear)
            puzzleDatesYear = [...new Set(puzzleDatesYear)]

            this.setState({
                datesYear: [...this.state.datesYear, puzzleDatesYear],
                averagesYear: [...this.state.averagesYear, puzzleSolvesYear],
                datesMonth: [...this.state.datesMonth, puzzleDatesMonth],
                averagesMonth: [...this.state.averagesMonth, puzzleSolvesMonth],
                datesWeek: [...this.state.datesWeek, puzzleDatesWeek],
                averagesWeek: [...this.state.averagesWeek, puzzleSolvesWeek],
                dateAverages: [...this.state.dateAverages, puzzleSolves],
                datesDBunique: [...this.state.datesDBunique, puzzleDates],
                countNumberSolves: [...this.state.countNumberSolves, numberSolves],
                countNumberSolvesWeek: [...this.state.countNumberSolvesWeek, numberSolvesWeek],
                countNumberSolvesMonth: [...this.state.countNumberSolvesMonth, numberSolvesMonth],
                countNumberSolvesYear: [...this.state.countNumberSolvesYear, numberSolvesYear],
                
            })
        }
        this.setState({
            numberSolvesCategory: [...this.state.numberSolvesCategory, numberSolvesCategoryAllTime, numberSolvesCategoryWeek, numberSolvesCategoryMonth,numberSolvesCategoryYear]
        })
    }

    consolidateAllDatesAndSolves = () => {
        this.setState({
            allDateAverages: [this.state.dateAverages, this.state.averagesWeek, this.state.averagesMonth, this.state.averagesYear,],
            allDates: [this.state.datesDBunique, this.state.datesWeek, this.state.datesMonth, this.state.datesYear,],
            allCounts: [this.state.countNumberSolves, this.state.countNumberSolvesWeek, this.state.countNumberSolvesMonth, this.state.countNumberSolvesYear],
        })
    }

    getBestTimes = () => {
        let puzzleBestTimesSummary = []
        for (const puzzle of this.state.puzzlesSummary){
            let timesAndPuzzle = []
            let allTimesMS = []
            let allTimes = []
            for (const solve of this.props.solves){
                if (solve.puzzle===puzzle){
                    if(solve.isplustwo){
                        allTimesMS.push(solve.millisecondstwo)
                        allTimes.push(solve.plustwo)
                    }else{
                        allTimesMS.push(solve.milliseconds)
                        allTimes.push(solve.solve)
                    }
                }
            }
            let index = allTimesMS.indexOf(String(Math.min(...allTimesMS)))
            timesAndPuzzle.push(puzzle)
            timesAndPuzzle.push(allTimes[index])
            timesAndPuzzle.push(allTimes.length)
            puzzleBestTimesSummary.push(timesAndPuzzle)
        }
        this.setState({
            puzzlesSummary: puzzleBestTimesSummary,
        })
    }

    compare2 = (a,b) => {
        return b-a
    }

    compare = (a,b) => {
        return a - b
    }

    compareUnix = (a,b) => {
        if (a.unix > b.unix){
            return 1
        }
        if (a.unix < b.unix){
            return -1
        }
        return 0
    }

    dateAverage = () => {
        //gets average of solves by date 
        let threshold = Math.round(Date.now()/1000)
        let finalAverages  = []
        let finalAveragesWeek  = []
        let finalAveragesMonth  = []
        let finalAveragesYear  = []
        let allMS = []
        let allMSWeek = []
        let allMSMonth = []
        let allMSYear = []
        for (const date of this.state.datesDBunique[0]) {
            let solvesArray = []
            let solvesArrayWeek = []
            let solvesArrayMonth = []
            let solvesArrayYear = []
            for (const solve of this.props.solves) {
                if (solve.date===date){
                    solvesArray.push(solve.milliseconds)
                    if (solve.unix > (threshold-604800)){
                        solvesArrayWeek.push(solve.milliseconds)
                    }
                    if (solve.unix > (threshold-2592000)){
                        solvesArrayMonth.push(solve.milliseconds)
                    }
                    if (solve.unix > (threshold-31536000)){
                        solvesArrayYear.push(solve.milliseconds)
                    }
                }
            }
            if(solvesArray.length){
                allMS.push(solvesArray)
            }
            if(solvesArrayWeek.length){
                allMSWeek.push(solvesArrayWeek)
            }
            if(solvesArrayMonth.length){
                allMSMonth.push(solvesArrayMonth)
            }
            if(solvesArrayYear.length){
                allMSYear.push(solvesArrayYear)
            }
        }
        for (const array1 of allMS) {
            let totalMS = 0
            let divisor = 0
            for (const time of array1) {
                totalMS += Number(time)
                divisor ++
            }
            let avg = (totalMS/divisor)/1000
            finalAverages.push(Number(avg.toFixed(3)))
        }
        for (const array1 of allMSWeek) {
            let totalMS = 0
            let divisor = 0
            for (const time of array1) {
                totalMS += Number(time)
                divisor ++
            }
            let avg = (totalMS/divisor)/1000
            finalAveragesWeek.push(Number(avg.toFixed(3)))
        }
        for (const array1 of allMSMonth) {
            var totalMS = 0
            var divisor = 0
            for (const time of array1) {
                totalMS += Number(time)
                divisor ++
            }
            let avg = (totalMS/divisor)/1000
            finalAveragesMonth.push(Number(avg.toFixed(3)))
        }
        for (const array1 of allMSYear) {
            let totalMS = 0
            let divisor = 0
            for (const time of array1) {
                totalMS += Number(time)
                divisor ++
            }
            let avg = (totalMS/divisor)/1000
            finalAveragesYear.push(Number(avg.toFixed(3)))
        }

        this.setState({
            averagesYear: [finalAveragesYear, ...this.state.averagesYear],
            averagesMonth: [finalAveragesMonth, ...this.state.averagesMonth],
            averagesWeek: [finalAveragesWeek, ...this.state.averagesWeek],
            dateAverages: [finalAverages, ...this.state.dateAverages]
        })
    }

    username = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    newPassword = (event) => {
        this.setState({
            newPassword: event.target.value
        })
    }

    newPasswordReenter = (event) => {
        this.setState({
            newPasswordReenter: event.target.value
        })
    }

    oldPassword = (event) => {
        this.setState({
            oldPassword: event.target.value
        })
    }

    removeSessionFromState = index => {
        const { solvesSorted } = this.state;
        this.setState({
            solvesSorted: solvesSorted.filter((solve, i) => { 
                return i !== index;
            }),
        });
    }

    changeUsername = () => {
        if (this.state.username.length>2){
            fetch("https://blooming-hollows-98248.herokuapp.com/updateusername", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    newUsername: this.state.username,
                    id: this.props.id
                })
            })
            .then(response=>response.json())
            .then(data=>{
                if (data === "username exists"){
                    this.setState({
                        usernameExists: true, 
                    })
                }else{
                    this.props.getNewUsername(this.state.username)
                    this.props.loadUser(data)
                    this.usernameChanged()
                    document.getElementById('txt-input').value='';
                    this.setState({
                        usernameExists: false, 
                    })
                }
            })
        }
    }

    usernameChanged = () => {
        this.setState({
            isUsernameChanged: true,
        })
    }

    changePassword = () => {
        if (this.state.newPassword===this.state.newPasswordReenter){
            fetch("https://blooming-hollows-98248.herokuapp.com/updatepassword",{
                method: "put",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    id: this.props.id,
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                }) 
            })
            .then(response=>response.json())
            .then(data=>{
                if(data==="incorrect password") {
                    this.setState({
                        isWrongPassword: true,
                    })
                }else{
                    this.props.loadUser(data)
                    document.getElementById("change").value=""
                    document.getElementById("change2").value=""
                    document.getElementById("change3").value=""
                    this.setState({
                        isWrongPassword: false,
                        isPasswordMatch: true,
                        isPasswordChanged: true,
                    })
                }
            })
        }else{
            this.setState({
                isPasswordMatch: false,
            })
        }
    }  

    deleteAccount = () => {
        fetch("https://blooming-hollows-98248.herokuapp.com/deleteaccount", {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                password: this.state.deleteAccountPassword,
                id: this.props.id,
            })
        }).then(response=> response.json())
        .then(data=> {
            if(data==="incorrect password"){
                this.setState({
                    isWrongPassword2: true,
                })
            }
            else{
                localStorage.setItem("theme", JSON.stringify(true))
                this.props.signIn()
                this.props.signedIn()
                sessionStorage.removeItem("solvesStored")
                localStorage.removeItem("scrambleLength")
                localStorage.removeItem("mobile")
                localStorage.removeItem("sessionconfirm")
                localStorage.removeItem("theme")
                localStorage.removeItem("user")
                localStorage.removeItem("lastsession")
                localStorage.removeItem("isCountDownActivated")
                localStorage.removeItem("ao")
                localStorage.removeItem("ao2")
                localStorage.removeItem("inspectionTime") 
                localStorage.removeItem("solveconfirm")
                localStorage.removeItem("xyz")
                localStorage.removeItem("color")
                localStorage.removeItem("offline")
                localStorage.setItem("countDown", JSON.stringify(false))
                localStorage.setItem("scrambleLength", 22)
                this.props.signout()
                this.setState({
                    isWrongPassword2: false,
                })
            }
        })
    }

    deleteAccountPassword = (event) => {
        this.setState({
            deleteAccountPassword: event.target.value
        })
    }

    themeToDB = () => {
        if (this.props.isBackgroundLight){
            this.props.dark()
        }else {
            this.props.light()
        }
        localStorage.setItem("theme", JSON.stringify(!this.props.isBackgroundLight))
        let offline = JSON.parse(localStorage.getItem("offline"))
        if(!offline){
            fetch("https://blooming-hollows-98248.herokuapp.com/theme", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.props.id,
                    theme: !this.props.isBackgroundLight
                })
            }).then(res=>res.json())
        }
    }

    analytics = () => {
        //route change
        this.setState({
            isAnalytics: true,
            isSolves: false,
        })
    }

    settings = () => {
         //route change   
        this.setState({
            isAnalytics: false,
        })
    }

    solvesRoute = () => {
        setTimeout(()=>this.optionSelectOnMount(),5)
        setTimeout(()=>this.options(),3)
        this.setState({
            cardSortValue: "All sessions",
            isSolves: true,
            isAnalytics: true,
        })
    }

    componentDidMount(){
        this.manageSolveData()
        setTimeout(()=>this.options(),100)
        setTimeout(()=>this.cardSortValue(),200)
    }

    changeIndexNumber = (input) =>{
        const x = document.getElementById(input)
        const y = x.options[x.selectedIndex].value
        this.setState({
            indexNumberGraphs: y
        })
    }

    changeTimePeriod = (input) =>{
        const x = document.getElementById(input)
        const y = x.options[x.selectedIndex].value
        this.setState({
            timePeriod: y
        })
    }

    options = () => {
        if (document.getElementById("cardSelect")){
            let optionsArray = ["All sessions", ...this.state.categories]
            const selectbox = document.getElementById("cardSelect")
            for (const option of optionsArray) {
                let newOption = document.createElement("option")
                newOption.text=option
                newOption.value=option
                selectbox.add(newOption)
            }
        }
    }

    cardSortValue = () =>{
        if (this.props.uniqueSessionsDB.length > 4 ){
            const x = document.getElementById("cardSelect")
            const y = x.options[x.selectedIndex].value
            let array1 = []
            let sessions = []
            let interfaceSession = {}
            let countDown = this.state.solvesSorted.length 
            for (const solve of this.state.solvesSorted){
                let array2 = []
                for (const solve2 of solve){
                    if (solve2.puzzle===y || solve2.sessionname===y) {
                        interfaceSession[solve2.session] = countDown
                        array2.push(solve2)
                        sessions.push(solve2.session)
                    }
                }
                countDown--
                if(array2.length>0){
                    array1.push(array2)
                }
            }
            sessions = new Set(sessions)
            sessions = Array.from(sessions)
            if (array1.length===0){
                array1=this.state.solvesSorted
                sessions=this.props.uniqueSessionsDB
            }
            
            this.setState({
                solvesSortedCardList: array1,
                cardSortValue: y,
                interfaceSession: interfaceSession,
                optionSelected: y,
            })
        }
    }

    optionSelectOnMount = () => {
        if (this.state.optionSelected.length > 0){
            let val = this.state.optionSelected;
            let sel = document.getElementById('cardSelect');
            let opts = sel.options;
            let counter = opts.length -1
            let opt = ""
            let j = 0
            while (counter > 0) {
                counter--
                j++
                opt = opts[j]
                if (opt.value === val) {
                    sel.selectedIndex = j;
                    break;
                }
            }
        }
    }

    getAveragesMS = () => {
        let averageArray = []
        for (const solves of this.state.solvesSorted) {
            let msTotal = 0
            let count = 0
            for (const solve of solves){
                msTotal += Number(solve.milliseconds)
                count++
            }
            averageArray.push(Math.round(msTotal/count))
        }
        this.setState({
            averagesMS: averageArray,
        })
    }


    test = () => {
        // console.log(this.state.cardSortValue)
    }

    render() {
        return(
            <div>
                {/* <button onClick={this.test}>push</button> */}
                
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div style={{marginRight: "6%"}}>
                        <h1><button onClick={this.props.signIn} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Home</button></h1>
                        </div>
                    </nav>
            
                <h1 className="summary-center" > <nav style={{display: 'flex'}}>
                <button onClick={this.solvesRoute} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Solves</button> 
                <button onClick={this.analytics} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Analytics</button> 
                <button onClick={this.settings} style={{color: this.props.isBackgroundLight ? "rgb(23, 23, 23)" : "whitesmoke", backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", borderColor: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}} className="button2">Settings</button> 
                </nav></h1>
                {this.state.isAnalytics 
                ?
                (this.state.isSolves ?
                <div  style={{backgroundColor: this.props.isBackgroundLight ? "whitesmoke" : "rgb(23, 23, 23)", color: this.props.isBackgroundLight ?  "rgb(23, 23, 23)" : "whitesmoke"}}>
                    {this.props.uniqueSessionsDB.length > 4 ? 
                    <select style={{color: this.props.isBackgroundLight ?  "black" : "white"}} className={this.props.isBackgroundLight ? "summary-center pa1 ba b--green bg-white" : "summary-center pa1 ba b--green bg-black"} onChange={this.cardSortValue} id="cardSelect"></select>
                    :
                    <h1> </h1>
                    }
                    <CardList 
                    solves={this.props.solves}
                    send={this.props.send}
                    puzzleBest={this.state.puzzleBest}
                    puzzleWorst={this.state.puzzleWorst}
                    interfaceSession={this.state.interfaceSession}
                    getSessionNameOnLoad={this.props.getSessionNameOnLoad}
                    isConfirmSessionDelete={this.props.isConfirmSessionDelete}
                    isConfirmSolveDelete={this.props.isConfirmSolveDelete}
                    removeFromSolves={this.props.removeFromSolves} 
                    getSessionNumber={this.props.getSessionNumber} 
                    sessions={this.props.sessions} 
                    getInterfaceSession={this.props.getInterfaceSession} 
                    removeFromUniqueSessionsDB={this.props.removeFromUniqueSessionsDB} 
                    uniqueSessionsDB={this.props.uniqueSessionsDB} 
                    loadPastSessionSolveData={this.props.loadPastSessionSolveData} 
                    removeSessionFromState={this.removeSessionFromState} 
                    getSolves={this.manageSolveData} 
                    id={this.props.id} 
                    solvesSorted={this.state.solvesSortedCardList} 
                    isBackgroundLight={this.props.isBackgroundLight}
                    />                
                </div>
                :
                <div>
                    <Graph
                    timePeriod={this.state.timePeriod}
                    changeTimePeriod={this.changeTimePeriod}
                    changeIndexNumber={this.changeIndexNumber}
                    categories={this.state.categories} 
                    isBackgroundLight={this.props.isBackgroundLight} 
                    averages={this.state.allDateAverages} 
                    dates={this.state.allDates} 
                    />
                    <GraphNumberSolves 
                    timePeriod={this.state.timePeriod}
                    indexNumberGraphs={this.state.indexNumberGraphs}
                    categories={this.state.categories} 
                    isBackgroundLight={this.props.isBackgroundLight} 
                    numberSolves={this.state.allCounts} 
                    dates={this.state.allDates}
                    />
                    <Summary 
                    isBackgroundLight={this.props.isBackgroundLight}
                    data={this.state.puzzlesSummary}
                    columns={['Puzzle', 'Best Time', 'Total Number of Solves']}
                    />
                    <Donut 
                    timePeriod={this.state.timePeriod}
                    isBackgroundLight={this.props.isBackgroundLight}
                    numberSolvesCategory={this.state.numberSolvesCategory}
                    puzzles={this.state.puzzles}
                    />
                </div>                    
                )
                :
                <Settings 
                solvesApp={this.props.solves}
                setStateOffline={this.props.setStateOffline}
                offlineState={this.props.offlineState}
                offline={this.props.offline}
                changeInspectionTime={this.props.changeInspectionTime}
                aoNum2={this.props.aoNum2} 
                aoNumChange2={this.props.aoNumChange2}
                disableTimer={this.props.disableTimer}
                mobileStartStop={this.props.mobileStartStop}
                isPasswordChanged={this.state.isPasswordChanged}
                newPasswordReenter={this.newPasswordReenter}
                isPasswordMatch={this.state.isPasswordMatch}
                aoNumChange={this.props.aoNumChange}
                averagesMS={this.state.averagesMS}
                getAveragesMS={this.getAveragesMS}
                addToUniqueSessionsDB={this.props.addToUniqueSessionsDB}
                getInterfaceSession={this.props.getInterfaceSession}
                getSessionNumber={this.props.getSessionNumber}
                manageSolveData={this.manageSolveData}
                inspection={this.props.inspection}
                confirmSessionDelete={this.props.confirmSessionDelete}
                confirmSolveDelete={this.props.confirmSolveDelete}
                getSolvesFromImport={this.props.getSolvesFromImport}
                getSolvesFromImportManual={this.props.getSolvesFromImportManual} 
                getCategories={this.getCategories} 
                solves={this.state.solvesSorted} 
                getSolves={this.getSolves} 
                scrambleQuantityMinus={this.props.scrambleQuantityMinus}  
                scrambleQuantityPlus={this.props.scrambleQuantityPlus} 
                id={this.props.id} 
                uniqueSessionsDB={this.props.uniqueSessionsDB} 
                inspectionTimePlus={this.props.inspectionTimePlus} 
                inspectionTimeMinus={this.props.inspectionTimeMinus} 
                inspectionTime={this.props.inspectionTime}  
                isCountDownActivated={this.props.isCountDownActivated} 
                aoNum={this.props.aoNum} 
                isBackgroundLight={this.props.isBackgroundLight} 
                signout={this.props.signout} 
                scrambleQuantity={this.props.scrambleQuantity} 
                usernameExists={this.state.usernameExists} 
                isUsernameChanged={this.state.isUsernameChanged} 
                changeUsername={this.changeUsername} 
                newPassword={this.newPassword} 
                oldPassword={this.oldPassword} 
                isWrongPassword={this.state.isWrongPassword} 
                changePassword={this.changePassword} 
                deleteAccountPassword={this.deleteAccountPassword} 
                isWrongPassword2={this.state.isWrongPassword2} 
                deleteAccount={this.deleteAccount} 
                themeToDB={this.themeToDB} 
                username={this.username} 
                />
                }
            </div>
        )
    }
}

export default Dashboard