// todo сделать поле вывода красивше - отдельные поля для каждого результата, последний - большой, остальные - меньше

class Dice {
    constructor(facesNumb, template, field) {
        this.facesNumb = facesNumb
        this.template = template
        this.field = field
        
        // this.create()
    }

    create(key) {
        const dice = this.template.content.cloneNode(true)
        dice.querySelector('.dice_roller').id = 'd' + this.facesNumb
        dice.querySelector('.dice_label').innerText = 'D' + this.facesNumb
        dice.querySelector('.dice_img').src = 'dices/d' + this.facesNumb + '.svg'
        this.field.append(dice)
    
        this.dice_node = document.getElementById('d' + this.facesNumb)
    
        setTimeout(() => {
            this.dice_node.classList.add('active_roller')
            this.dice_node.classList.remove('hidden_roller')
            console.log(this.dice_node)

            this.dice_node.addEventListener('click', () => new Roller(this.dice_node, this.facesNumb))

            document.addEventListener('keydown', (event) => {
                if (event.ctrlKey && event.code == 'Digit'+key) {
                    console.log(this.dice_node)
                    new Roller(this.dice_node, this.facesNumb)
                }
            });
        }, intervalTime / 4)
    }
}

class Roller extends Dice {
    constructor(dice_node, facesNumb) {
        super()
        this.dice_node = dice_node
        this.facesNumb = facesNumb - 1
        this.intervalTime = intervalTime
        this.intervalsNumb = intervalsNumb
        
        this.roll()
    }

    roll = () => {

        const roller = this.dice_node.cloneNode(true)
        roller.classList.add('hidden_roller')
        roller.classList.remove('active_roller')
        roller.id = ''

        rollers_field.appendChild(roller)

        setTimeout(() => {
            roller.classList.add('active_roller')
            roller.classList.remove('hidden_roller')
        }, this.intervalTime / 3)

        let counter = 0
        const label = roller.getElementsByClassName('dice_label')[0]

        const interval = setInterval(() => {
            const rnd = Math.round(Math.random() * this.facesNumb) + 1
            label.innerText = rnd
    
            counter ++
            if (counter >= this.intervalsNumb){
                clearInterval(interval)
                resultsOutput(rnd, this.facesNumb)
            }
        }, this.intervalTime)

        setTimeout(() => this.remove(roller), this.intervalTime * this.intervalsNumb + 320)
    }

    remove(roller){
        roller.classList.remove('active_roller')
        roller.classList.add('hidden_roller')
    
        setTimeout(() => {
            rollers_field.removeChild(roller)
        }, this.intervalTime * this.intervalsNumb / 3)
    }
}

const intervalTime = 100
const intervalsNumb = 16
const rollers_field = document.getElementById('rollers_field')

function dicesInit(){
    const dices = [20, 12, 10, 8, 6, 4]
    const roller_tmpl = document.getElementById('roller_tmpl')
    const dices_field = document.getElementById('dices')

    let counter = 0

    const interval = setInterval(() => {    
        dices[counter] = new Dice(dices[counter], roller_tmpl, dices_field)
        dices[counter].create(counter + 1)
        counter ++
        if (counter >= dices.length) clearInterval(interval)
    }, intervalTime / 3)
}
dicesInit()

function resultsOutput(res, facesNumb){
    const field = document.getElementById('dices_results')
    const newRes = document.createElement('div')
    newRes.classList.add('dice_result')
    const p1 = document.createElement('p')
    
    p1.innerText = res
    newRes.appendChild(p1)
    const p2 = document.createElement('p')
    facesNumb += 1
    p2.innerText = 'd' + facesNumb
    if (facesNumb == 20) {
        p1.classList.add('border')
        if (res == facesNumb) {
            p1.classList.add('success')
            p2.classList.add('success')
        }
        if (res == 1) {
            p1.classList.add('fail')
            p2.classList.add('fail')
        }
    }
    
    newRes.appendChild(p2)
    field.prepend(newRes)
}



class Map {
    map_field = document.getElementById('maps')
}