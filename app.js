const Koa = require("koa");
const KoaRouter = require("koa-router");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require('koa-bodyparser');
const json = require("koa-json");

const app = new Koa();
const router = new KoaRouter();

const posts = ["We’ve not moved for ages.\n" +
"\n" +
"“What’s the square root of New Jersey?” asks my daughter from the back seat.\n" +
"\n" +
"“Hmmm,” I say solemnly, as though this is the kind of question with which I grapple every day. What might the answer be? Springsteen?\n" +
"\n" +
"I could sit in traffic all day.", "The nighthawks down bad coffee and talk about all the chances they never took. \n" +
"Catherine hears without listening, counting out her tips in nickels and dimes, aching to be someplace else, where love is gentler, \n" +
"and the past no longer lives in the very marrow of your bones.", "Sleet beats against my parka. No more whaling: banned by those whose ancestors slaughtered bowheads to light the lamps of Boston.\n" +
"\n" +
"Above, Rapallo-chuted, thermal-suited, oxygen-tanked daredevils crisscross the aurora, surfing the dancing green-gold: Tourists riding boards among colors of my soul.\n" +
"\n" +
"I stab my harpoon into shelf-ice and walk away."];


app.use(bodyParser());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());


render(app, {
    root: path.join(__dirname, "views"),
    layout: "layout",
    viewExt: "html",
    cache: false,
    debug: false
});

router.get("/", index);
router.get("/add", postPage);
router.post("/add", toPost);


async function index(context) {
    await context.render("index", {
        posts: posts
    });
}

async function postPage(context) {
    await context.render("add");
}

async function toPost(context) {
    const body = context.request.body;
    console.log(body);
    posts.push(body.single_post);
    context.redirect("/");

}

router.get("/test", context => {
    context.body = "Hello World";
});


// app.listen(1234, () => {
//     console.log("Server started...")
// });

let port = process.env.PORT || 1234;
app.listen(port);
console.log("Server started...");
console.log('Listening to %s', port);
