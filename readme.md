# 3D Globe with Datamaps

<img src="https://github.com/odysseyofcoding/DataMaps3DPublic/assets/74965926/bf431a7d-09a4-4e45-ac4e-a952580730ad" alt="Alt-Text" width="300" height="300">

Welcome to a demo showcasing the usage of Datamaps without frameworks like Node.js or React.

The data utilized for this demo is sourced from [mledoze](https://github.com/mledoze). You can find the data content at the following location: [countries.json](https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json), is available under the Open Database License (ODbL). File is included.

To avoid unnecessary traffic and direct requests to the mledoze repository every time the demo is accessed, I have created a C# script. 

This script fetches the data once and generates a static file with the desired properties, which can be directly used in the demo without relying on live requests to the mledoze repository.

```csharp
public class Country
{
    public Name name { get; set; } = new();
    public string cca2 { get; set; } = string.Empty;
    public string cca3 { get; set; } = string.Empty;
    public string ccn3 { get; set; } = string.Empty;
    public double[] latlng { get; set; } = Array.Empty<double>();
    public string[] borders { get; set; } = Array.Empty<string>();
    public string flag { get; set; } = string.Empty;
}
public class Name
{
    public string common { get; set; } = string.Empty;
    public string official { get; set; } = string.Empty;
}
```

```csharp
using HttpResponseMessage response = await client.GetAsync("https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json");
```

```csharp
var countries = JsonConvert.DeserializeObject<List<Country>>(json);
if (countries is not null)
{
    sw.WriteLine("var data = {");
    countries.ForEach(x =>{
        if (countries.IndexOf(x) > countries.Count - 2)
        {
            sw.WriteLine(x.cca3 + ":{");
            sw.WriteLine($"Label:\"{x.name.common}\",");
            sw.WriteLine($"Latitude:{x.latlng[0]},");
            sw.WriteLine($"Longitude:{x.latlng[1]}");
            sw.WriteLine("}");
            /*Fun fact: prettifier appends comma anyways -.- */

        }
        else if (countries.IndexOf(x) < countries.Count - 2)
        {
            /*same as above but with a comma to seperate entries*/
            sw.WriteLine("},");
        }

    });
    sw.WriteLine("}");
}
```
This demo is built exclusively using static web technologies such as HTML, CSS, and JavaScript. It doesn't rely on specific frameworks but rather incorporates libraries and resources through CDNs (Content Delivery Networks) or by directly including them as static files.

By taking this approach, the demo remains lightweight and independent of specific frameworks while leveraging the functionalities provided by external libraries. This enables efficient and flexible development by leveraging core web technologies and integrating the benefits of libraries through CDNs or static files.

Feel free to explore the demo by visiting the [GitHub Pages](https://odysseyofcoding.github.io/DataMaps3DPublic/) associated with this project.