#! /usr/bin/env node

// const yargs = require("yargs");
// const chalk = await import('chalk')
// const boxen = require('boxen')
import yargs from "yargs"
import chalk from "chalk"
import boxen from "boxen"
import {hideBin} from 'yargs/helpers'

yargs(hideBin(process.argv)).command({
    command:'add',
    describe:'Adding command',
    handler:function(){
        console.log('Adding notes')
    }
}).parse()
console.log('yargs.argv')