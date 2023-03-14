from flask import jsonify, url_for

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center">
        <br>
        <img style="height: 120px" src='https://scontent.fmvd1-1.fna.fbcdn.net/v/t1.6435-9/162033568_268299338077910_8571571259160410812_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a26aad&_nc_ohc=ZkO-OFzWo9sAX8dEWgJ&_nc_ht=scontent.fmvd1-1.fna&oh=00_AfBNSPdaXmHRYkG4VEt_EnLwIMZYosKls2vcPgpDPxDKXQ&oe=63F79CE1' />
        <h1 style="font-family: Verdana, Geneva, sans-serif; color: red">Activa Fitness Club</h1>
        <p style="font-family: Verdana, Geneva, sans-serif">API HOST: <br>
            <script>document.write('<input style="padding: 5px; width: 300px; text-align: center" type="text" value="'+window.location.href+'" />');</script>
        </p>
        <br>
        <p style="font-family: Verdana, Geneva, sans-serif">Bienvenidos a la base de datos. <br>Aqui es donde la magia ocurre!</p>
        <br>
        <br>
        <p style="font-family: Verdana, Geneva, sans-serif">Realizado por <a href="https://ceciliaperdomo.netlify.app/">Cecilia Perdomo</a></p>
        <br>
        <ul style="text-align: center; font-family: Verdana, Geneva, sans-serif">"""+links_html+"</ul></div>"
